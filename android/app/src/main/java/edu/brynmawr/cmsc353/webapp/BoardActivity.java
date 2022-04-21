package edu.brynmawr.cmsc353.webapp;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.apollographql.apollo.ApolloCall;
import com.apollographql.apollo.ApolloClient;
import com.apollographql.apollo.api.Error;
import com.apollographql.apollo.api.Input;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;
import java.util.List;

public class BoardActivity extends AppCompatActivity {

    List<Post> posts = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_board);
        String bN = getIntent().getExtras().get("boardname").toString();
        String email = getIntent().getExtras().get("email").toString();
        RecyclerView rvPosts = findViewById(R.id.rvPosts);

        // Logging out
        Button btnLogout = findViewById(R.id.btnLogout);
        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                goMainActivity(bN, email);
            }
        });
        FloatingActionButton createPost = findViewById(R.id.btnCreatePost);
        createPost.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(BoardActivity.this, CreatePostActivity.class);
                i.putExtra("boardName", bN);
                i.putExtra("email", email);
                startActivity(i);
            }
        });
        PostAdapter postAdapter = new PostAdapter(this, posts);
        rvPosts.setAdapter(postAdapter);
        rvPosts.setLayoutManager(new LinearLayoutManager(this));

        ApolloClient apolloClient = ApolloClient.builder()
                .serverUrl("http://10.0.2.2:3001/graphql")
                .build();
        Input<String> boardName = new Input<>(bN, true);

        // Populate views
        apolloClient.query(new GetPostsQuery(new GetPostsInput(Input.fromNullable(null), Input.fromNullable(null),
                Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null),
                Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null),
                Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null),
                Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null),
                Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null),
                boardName))).enqueue( new ApolloCall.Callback<GetPostsQuery.Data>() {

                    @Override
                    public void onResponse(@NonNull Response<GetPostsQuery.Data> response) {
                        List<Error> errors = response.getErrors();
                        if (errors != null) {
                            Integer errorSize = (Integer) errors.size();
                            Log.i("errorSize", errorSize.toString());
                        }
                        if (errors != null && errors.size() > 0) {
                            Log.e("getPostsError", errors.toString());
                            String message = errors.get(0).getMessage();
                            runOnUiThread(new Runnable() {

                                @Override
                                public void run() {
                                    Toast.makeText(BoardActivity.this, "Failed getting posts", Toast.LENGTH_SHORT).show();
                                }
                            });
                            return;
                        }
                        List<GetPostsQuery.GetPost> getposts = response.getData().getPosts;
                        for (GetPostsQuery.GetPost getpost:getposts) {
                            posts.add(new Post(getpost.title(), getpost.content(), getpost._id(), getpost.creatorName()));
                        }
                        runOnUiThread(new Runnable() {

                            @Override
                            public void run() {

                                postAdapter.notifyDataSetChanged();

                            }
                        });
                    }
                    @Override
                    public void onFailure(@NonNull ApolloException e) {
                        Log.d("Getting Post", e.toString());
                        runOnUiThread(new Runnable() {

                            @Override
                            public void run() {

                                Toast.makeText(BoardActivity.this, "Failed getting posts", Toast.LENGTH_SHORT).show();

                            }
                        });
                    }
                } );
    }

    private void goMainActivity(String bN, String email) {
        Intent i = new Intent(this, MainActivity.class);
        i.putExtra("boardName", bN);
        i.putExtra("email", email);
        startActivity(i);
        finish();
    }

}

    /*
    This implementation uses AsyncTasks, which are now deprecated.

    public void onConnectButtonClick(View v) {

        TextView tv = findViewById(R.id.statusField);

        try {
            // assumes that there is a server running on the AVD's host on port 3000
            // and that it has a /test endpoint that returns a JSON object with
            // a field called "message"
            URL url = new URL("http://10.0.2.2:3000/test");

            AccessWebTask task = new AccessWebTask();
            task.execute(url);
            
            String message = task.get();
            tv.setText(message);

        }
        catch (Exception e) {
            // uh oh
            e.printStackTrace();
            tv.setText(e.toString());
        }


    }

     */