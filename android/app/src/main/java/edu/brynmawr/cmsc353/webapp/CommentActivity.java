package edu.brynmawr.cmsc353.webapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.apollographql.apollo.ApolloCall;
import com.apollographql.apollo.ApolloClient;
import com.apollographql.apollo.api.Error;
import com.apollographql.apollo.api.Input;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class CommentActivity extends AppCompatActivity {
    public static final String TAG = "CommentActivity";
    private Button btnCreateBoard;
    List<Comment> comments = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_comment);

        RecyclerView rvComments = findViewById(R.id.rvComments);
        Button btnLogout = findViewById(R.id.btnLogout);
        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //goLoginActivity();
            }
        });
        Intent intent = getIntent();
        CommentAdapter commentAdapter = new CommentAdapter(this, comments);
        rvComments.setAdapter(commentAdapter);
        rvComments.setLayoutManager(new LinearLayoutManager(this));

        ApolloClient apolloClient = ApolloClient.builder()
                .serverUrl("http://10.0.2.2:3001/graphql")
                .build();

        apolloClient.query(new GetPostCommentsQuery(new PostIdInput(Objects.requireNonNull(intent.getStringExtra("postId")))))
                .enqueue( new ApolloCall.Callback<GetPostCommentsQuery.Data>() {

                    @Override
                    public void onResponse(@NonNull Response<GetPostCommentsQuery.Data> response) {
                        List<Error> errors = response.getErrors();
                        if (errors != null && errors.size() > 0) {
                            String message = errors.get(0).getMessage();
                            runOnUiThread(new Runnable() {

                                @Override
                                public void run() {
                                    Toast.makeText(CommentActivity.this, "Failed getting comments", Toast.LENGTH_SHORT).show();
                                }
                            });
                            return;
                        }
                        List<GetPostCommentsQuery.GetPostComment> getcomments = response.getData().getPostComments;
                        for (GetPostCommentsQuery.GetPostComment getcomment:getcomments) {
                            comments.add(new Comment(getcomment.creatorName(), getcomment.content()));
                        }
                        runOnUiThread(new Runnable() {

                            @Override
                            public void run() {

                                commentAdapter.notifyDataSetChanged();

                            }
                        });
                    }
                    @Override
                    public void onFailure(@NonNull ApolloException e) {
                    }
                } );

    }

    /*public void createBoardOnClick(View v) {
        // go to create board screen
        Intent i = new Intent(MainActivity.this, CreateBoardActivity.class);
        startActivity(i);
    }

    private void goLoginActivity() {
        Intent i = new Intent(this, LoginActivity.class);
        startActivity(i);
        finish();
    }*/
}