package edu.brynmawr.cmsc353.webapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

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

public class MainActivity extends AppCompatActivity {
    public static final String TAG = "MainActivity";
    List<Board> boards = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        String email = getIntent().getExtras().get("email").toString();
        RecyclerView rvBoards = findViewById(R.id.rvBoards);
        Button btnLogout = findViewById(R.id.btnLogout);
        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                goLoginActivity();
            }
        });
        FloatingActionButton btnCreateBoard = findViewById(R.id.btnCreateBoard);
        btnCreateBoard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(MainActivity.this, CreateBoardActivity.class);
                i.putExtra("email", email );
                startActivity(i);
            }
        });
        BoardAdapter boardAdapter = new BoardAdapter(this, boards, email);
        rvBoards.setAdapter(boardAdapter);
        rvBoards.setLayoutManager(new LinearLayoutManager(this));

        ApolloClient apolloClient = ApolloClient.builder()
                .serverUrl("http://10.0.2.2:3001/graphql")
                .build();

//        apolloClient.query(new GetPostCommentsQuery(new PostIdInput("23445"))).enqueue(new ApolloCall.Callback<GetPostCommentsQuery.Data>() {
//            @Override
//            public void onResponse(@NonNull Response<GetPostCommentsQuery.Data> response) {
//
//            }
//
//            @Override
//            public void onFailure(@NonNull ApolloException e) {
//
//            }
//        });

        apolloClient.query(new GetBoardsQuery(new GetBoardsInput(Input.fromNullable(null), Input.fromNullable(null),
                Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null),
                Input.fromNullable(null), Input.fromNullable(null),Input.fromNullable(null), Input.fromNullable(null),
                Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null), Input.fromNullable(null))))
                .enqueue( new ApolloCall.Callback<GetBoardsQuery.Data>() {

                    @Override
                    public void onResponse(@NonNull Response<GetBoardsQuery.Data> response) {
                        List<Error> errors = response.getErrors();
                        if (errors != null && errors.size() > 0) {
                            String message = errors.get(0).getMessage();
                            runOnUiThread(new Runnable() {

                                @Override
                                public void run() {
                                    Toast.makeText(MainActivity.this, "Failed getting boards", Toast.LENGTH_SHORT).show();
                                }
                            });
                            return;
                        }
                        List<GetBoardsQuery.GetBoard> getboards = response.getData().getBoards;
                        for (GetBoardsQuery.GetBoard getboard:getboards) {
                            boards.add(new Board(getboard.name(), getboard.description()));
                        }
                        runOnUiThread(new Runnable() {

                            @Override
                            public void run() {

                               boardAdapter.notifyDataSetChanged();

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
