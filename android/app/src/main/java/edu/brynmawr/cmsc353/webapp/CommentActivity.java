package edu.brynmawr.cmsc353.webapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.apollographql.apollo.ApolloCall;
import com.apollographql.apollo.ApolloClient;
import com.apollographql.apollo.api.Error;
import com.apollographql.apollo.api.Input;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

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
        Button btnBack = findViewById(R.id.btnBack);
        btnBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                goBoardActivity();
            }
        });
        Intent intent = getIntent();
        FloatingActionButton btnCreateButton = findViewById(R.id.btnCreateComment);
        btnCreateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent( CommentActivity.this, CreateCommentActivity.class);
                i.putExtra("postID", intent.getExtras().get("postID").toString());
                i.putExtra("email", intent.getExtras().get("email").toString());
                i.putExtra("boardName", getIntent().getExtras().get("boardName").toString());
                startActivity(i);
            }
        });

        CommentAdapter commentAdapter = new CommentAdapter(this, comments);
        rvComments.setAdapter(commentAdapter);
        rvComments.setLayoutManager(new LinearLayoutManager(this));

        ApolloClient apolloClient = ApolloClient.builder()
                .serverUrl("http://10.0.2.2:3001/graphql")
                .build();

        apolloClient.query(new GetPostCommentsQuery(new PostIdInput(intent.getExtras().get("postID").toString())))
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
                        Log.i("trying to check comments num for this comment: ", Integer.toString(comments.size()));
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


    private void goBoardActivity() {
        Intent i = new Intent(this, BoardActivity.class);
        i.putExtra("boardName", getIntent().getExtras().get("boardName").toString());
        i.putExtra("email", getIntent().getExtras().get("email").toString());
        startActivity(i);
        finish();
    }

}
