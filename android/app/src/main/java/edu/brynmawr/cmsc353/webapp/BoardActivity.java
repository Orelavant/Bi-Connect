package edu.brynmawr.cmsc353.webapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.apollographql.apollo.ApolloCall;
import com.apollographql.apollo.ApolloClient;
import com.apollographql.apollo.api.Input;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;

import java.util.ArrayList;
import java.util.List;

public class BoardActivity extends AppCompatActivity {

    List<Post> posts = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_board);

        RecyclerView rvBoards = findViewById(R.id.rvPosts);

        // Logging out
        Button btnLogout = findViewById(R.id.btnLogout);
        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                goLoginActivity();
            }
        });

        PostAdapter postAdapter = new PostAdapter(this, posts);
        rvBoards.setAdapter(postAdapter);
        rvBoards.setLayoutManager(new LinearLayoutManager(this));

        ApolloClient apolloClient = ApolloClient.builder()
                .serverUrl("http://10.0.2.2:3001/graphql")
                .build();

        // Populate views
        apolloClient.query(new GetPostsQuery(new GetBoardsInput(Input.fromNullable(null), Input.fromNullable(null),
                Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null),
                Input.fromNullable(null), Input.fromNullable(null),Input.fromNullable(null), Input.fromNullable(null),
                Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null))))
                .enqueue( new ApolloCall.Callback<GetPostsQuery.Data>() {

                    @Override
                    public void onResponse(@NonNull Response<GetPostsQuery.Data> response) {
                        List<GetPostsQuery.GetPost> getposts = response.getData().getPosts;
                        for (GetPostsQuery.GetPost getpost:getposts) {
                            posts.add(new Post(getpost.title(), getpost.content(),
                                    getpost._id(),
                                    getpost.creatorName()));
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
                    }
                } );

    }
    private void goLoginActivity() {
        Intent i = new Intent(this, LoginActivity.class);
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
