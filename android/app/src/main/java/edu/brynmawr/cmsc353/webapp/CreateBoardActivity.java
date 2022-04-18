package edu.brynmawr.cmsc353.webapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.apollographql.apollo.ApolloCall;
import com.apollographql.apollo.ApolloClient;
import com.apollographql.apollo.api.Error;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;

import com.apollographql.apollo.api.Input;
import java.util.List;

public class CreateBoardActivity extends AppCompatActivity {
    public static final String TAG = "CreateBoardActivity";
    private EditText etBoardName;
    private EditText etBoardDescription;
    private Button btnCancel;
    private Button btnCreate;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_board);
        etBoardName = findViewById(R.id.etBoardName);
        etBoardDescription = findViewById(R.id.etBoardDescription);
        btnCancel = findViewById(R.id.btnCancel);
        btnCreate = findViewById(R.id.btnCreate);
        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i(TAG, "onClick cancel board button");
                // go back to board list screen
                Intent i = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(i);
            }
        });
        btnCreate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.v(TAG, "onClick create board button");
                String boardName = etBoardName.getText().toString();
                String boardDescription = etBoardDescription.getText().toString();
                createBoard(boardName, boardDescription);
            }
        });
    }
    private void createBoard(String boardName, String boardDescription) {
        ApolloClient apolloClient = ApolloClient.builder()
                .serverUrl("http://10.0.2.2:3001/graphql")
                .build();


        apolloClient.mutate(new CreateBoardMutation(
                new UserIdInput(Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable("jhan1@brynmawr.edu")),
                new CreateBoardInput(boardName, Input.fromNullable(boardDescription), Input.fromNullable(null), Input.fromNullable(null))
                )
        )
                .enqueue( new ApolloCall.Callback<CreateBoardMutation.Data>() {

                    @Override
                    public void onResponse(@NonNull Response<CreateBoardMutation.Data> response) {
                        List<Error> errors = response.getErrors();
                        if (errors != null && errors.size() > 0) {
                            runOnUiThread(new Runnable() {

                                @Override
                                public void run() {
                                    Toast.makeText(CreateBoardActivity.this, "Create Board failed. Board already exists.", Toast.LENGTH_SHORT).show();
                                }
                            });
                            return;
                        }
                        Log.i(TAG, "create board succeeded");
                        runOnUiThread(new Runnable() {

                            @Override
                            public void run() {
                                String message = String.format("%s was successfully created!", boardName);
                                Toast.makeText(CreateBoardActivity.this, message, Toast.LENGTH_SHORT).show();
                                Intent i = new Intent(CreateBoardActivity.this, MainActivity.class);
                                startActivity(i);
                            }
                        });
                    }

                    @Override
                    public void onFailure(@NonNull ApolloException e) {
                        Log.i(TAG, "create board failed");
                        runOnUiThread(new Runnable() {

                            @Override
                            public void run() {
                                Toast.makeText(CreateBoardActivity.this, "Create Board failed, network error", Toast.LENGTH_SHORT).show();
                            }
                        });

                    }
                } );
    }
//    public void cancelOnClick(View v) {
//        Log.i(TAG, "onClick cancel board button");
//        // go back to board list screen
//        Intent i = new Intent(getApplicationContext(), MainActivity.class);
//        startActivity(i);
//    }
//
//    public void createOnClick(View v) {
//        Log.v(TAG, "onClick create board button");
//        etBoardName = findViewById(R.id.etBoardName);
//        etBoardDescription = findViewById(R.id.etBoardDescription);
//        String boardName = etBoardName.getText().toString();
//        String boardDescription = etBoardDescription.getText().toString();
//        createBoard(boardName, boardDescription);
//    }
}