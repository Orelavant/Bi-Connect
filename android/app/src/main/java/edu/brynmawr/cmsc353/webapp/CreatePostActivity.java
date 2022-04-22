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
import com.apollographql.apollo.api.Input;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;

import java.util.List;

public class CreatePostActivity extends AppCompatActivity {
    public static final String TAG = "CreatePostActivity";
    private EditText etPostTitle;
    private EditText etPostContent;
    private Button btnCancel;
    private Button btnCreate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_post);
        etPostTitle = findViewById(R.id.etPostTitle);
        etPostContent = findViewById(R.id.etPostContent);
        btnCancel = findViewById(R.id.btnCancel);
        btnCreate = findViewById(R.id.btnCreate);
        String boardName = getIntent().getExtras().get("boardName").toString();
        String email = getIntent().getExtras().get("email").toString();
        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i(TAG, "onClick cancel post button");
                // go back to post list screen
                Intent i = new Intent(getApplicationContext(), BoardActivity.class);
                i.putExtra("email", email);
                i.putExtra("boardname", boardName);
                startActivity(i);
            }
        });
        btnCreate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.v(TAG, "onClick create post button");
                String postTitle = etPostTitle.getText().toString();
                String postContent = etPostContent.getText().toString();
                createPost(postTitle, postContent, boardName, email);
            }
        });
    }

    private void createPost(String postTitle, String postContent, String boardName, String email) {
        ApolloClient apolloClient = ApolloClient.builder()
                .serverUrl("http://10.0.2.2:3001/graphql")
                .build();


        Log.i(TAG, email);
        apolloClient.mutate(new CreatePostMutation(new CreatePostInput(new Input<>(postTitle,
                true), postContent), new BoardIdInput(Input.fromNullable(null), "Bryn Mawr Confessions"),
                new UserIdInput(Input.fromNullable(null), new Input<>("jhan529", true), new Input<>("jhan1@brynmawr.edu", true))))

                .enqueue(new ApolloCall.Callback<CreatePostMutation.Data>() {

                    @Override
                    public void onResponse(@NonNull Response<CreatePostMutation.Data> response) {
                        List<Error> errors = response.getErrors();
                        if (errors != null && errors.size() > 0) {
                            Log.i("checking for error create post", errors.get(0).toString());
                            runOnUiThread(new Runnable() {

                                @Override
                                public void run() {
                                    Toast.makeText(CreatePostActivity.this, "Create Post failed.", Toast.LENGTH_SHORT).show();
                                }
                            });
                            return;
                        }
                        Log.i(TAG, "create post succeeded");
                        runOnUiThread(new Runnable() {

                            @Override
                            public void run() {
                                String message = String.format("%s was successfully created!", postTitle);
                                Toast.makeText(CreatePostActivity.this, message, Toast.LENGTH_SHORT).show();
                                Intent i = new Intent(CreatePostActivity.this, BoardActivity.class);
                                startActivity(i);
                            }
                        });
                    }

                    @Override
                    public void onFailure(@NonNull ApolloException e) {
                        Log.i(TAG, "create post failed");
                        runOnUiThread(new Runnable() {

                            @Override
                            public void run() {
                                Toast.makeText(CreatePostActivity.this, "Create post failed, network error", Toast.LENGTH_SHORT).show();
                            }
                        });

                    }
                });
    }
}