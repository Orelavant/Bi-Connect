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
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;

import java.util.List;

public class RegisterActivity extends AppCompatActivity {
    public static final String TAG = "RegisterActivity";
    private EditText etEmail;
    private EditText etPassword;
    private EditText etUsername;
    private Button btnRegister;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        etEmail = findViewById(R.id.etEmail);
        etPassword = findViewById(R.id.etPassword);
        etUsername = findViewById(R.id.etUsername);
        btnRegister = findViewById(R.id.btnRegister);
        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i(TAG, "onClick register button");
                String email = etEmail.getText().toString();
                String password = etPassword.getText().toString();
                String username = etUsername.getText().toString();
                createUser(username, email,password);
            }
        });
        }
    private void createUser(String username, String email, String password) {

        Log.i(TAG, "Attempting to create user " + email);
        ApolloClient apolloClient = ApolloClient.builder()
                .serverUrl("http://10.0.2.2:3001/graphql")
                .build();

        apolloClient.mutate(new CreateUserMutation(new CreateUserInput(username, email, password)))
                .enqueue( new ApolloCall.Callback<CreateUserMutation.Data>() {

                    @Override
                    public void onResponse(@NonNull Response<CreateUserMutation.Data> response) {
                        List<Error> errors = response.getErrors();
                        if (errors != null && errors.size() > 0) {
                            Log.e("loginError", errors.toString());
                            runOnUiThread(new Runnable() {

                                @Override
                                public void run() {
                                    Toast.makeText(RegisterActivity.this, "Duplicate User.", Toast.LENGTH_SHORT).show();
                                }
                            });
                            return;
                        }
                        Log.i(TAG, "Create user success for :" + username);
                        goLoginActivity();
                        runOnUiThread(new Runnable() {

                            @Override
                            public void run() {
                                Toast.makeText(RegisterActivity.this, "Create User Success!", Toast.LENGTH_SHORT).show();
                            }
                        });
                    }

                    @Override
                    public void onFailure(@NonNull ApolloException e) {
                        Log.i(TAG, "Create user failed for: " + email);
                        runOnUiThread(new Runnable() {

                            @Override
                            public void run() {
                                Toast.makeText(RegisterActivity.this, "Create user failed, duplicate.", Toast.LENGTH_SHORT).show();
                            }
                        });

                    }
                } );
    }

    private void goLoginActivity() {
        Intent i = new Intent(this, LoginActivity.class);
        startActivity(i);
        finish();
    }

}
