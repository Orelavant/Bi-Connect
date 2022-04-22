package edu.brynmawr.cmsc353.webapp;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.apollographql.apollo.ApolloCall;
import com.apollographql.apollo.ApolloClient;
import com.apollographql.apollo.api.Error;
import com.apollographql.apollo.api.Input;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;

import java.util.List;

public class CreateCommentActivity extends AppCompatActivity {
    public static final String TAG = "CreateCommentActivity";
    private EditText etCommentContent;
    private Button btnCancel;
    private Button btnCreate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_comment);
        etCommentContent = findViewById(R.id.etCommentContent);
        btnCancel = findViewById(R.id.btnCancel);
        btnCreate = findViewById(R.id.btnCreate);
        String postID = getIntent().getExtras().get("postID").toString();
        String email = getIntent().getExtras().get("email").toString();
        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i(TAG, "onClick cancel comment button");
                // go back to post list screen
                Intent i = new Intent(getApplicationContext(), CommentActivity.class);
                i.putExtra("postID", postID);
                i.putExtra("email", email);
                i.putExtra("boardName", getIntent().getExtras().get("boardName").toString());
                startActivity(i);
            }
        });
        btnCreate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.v(TAG, "onClick create comment button");
                String commentContent = etCommentContent.getText().toString();
                createComment(commentContent, postID, email);
            }
        });
    }

    private void createComment(String commentContent, String postID, String email) {
        ApolloClient apolloClient = ApolloClient.builder()
                .serverUrl("http://10.0.2.2:3001/graphql")
                .build();


        Log.i(TAG, email);
        apolloClient.mutate(new CreateCommentMutation(new CreateCommentInput(commentContent, Input.fromNullable("")), new PostIdInput(postID), new UserIdInput(Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(email))))

                .enqueue(new ApolloCall.Callback<CreateCommentMutation.Data>() {

                    @Override
                    public void onResponse(@NonNull Response<CreateCommentMutation.Data> response) {
                        List<Error> errors = response.getErrors();
                        if (errors != null && errors.size() > 0) {
                            Log.i("checking for error create comment", errors.get(0).toString());
                            runOnUiThread(new Runnable() {

                                @Override
                                public void run() {
                                    Toast.makeText(CreateCommentActivity.this, "Create comment failed. Comment already exists.", Toast.LENGTH_SHORT).show();
                                }
                            });
                            return;
                        }
                        Log.i(TAG, "create comment succeeded");
                        runOnUiThread(new Runnable() {

                            @Override
                            public void run() {
                                String message = String.format("%s was successfully created!");
                                Toast.makeText(CreateCommentActivity.this, message, Toast.LENGTH_SHORT).show();
                                Intent i = new Intent(CreateCommentActivity.this, CommentActivity.class);
                                i.putExtra("boardname", getIntent().getExtras().get("boardName").toString());
                                i.putExtra("email", getIntent().getExtras().get("email").toString());
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
                                Toast.makeText(CreateCommentActivity.this, "Create post failed, network error", Toast.LENGTH_SHORT).show();
                            }
                        });

                    }
                });
    }
}