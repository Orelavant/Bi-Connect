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
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;
import org.jetbrains.annotations.NotNull;

public class LoginActivity extends AppCompatActivity {

    public static final String TAG = "LoginActivity";
    private EditText etEmail;
    private EditText etPassword;
    private Button btnLogin;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
//        if(User already logged in){
//            goMainActivity();
//        }

        etEmail = findViewById(R.id.etEmail);
        etPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnLogin);
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i(TAG, "onClick login button");
                String email = etEmail.getText().toString();
                String password = etPassword.getText().toString();
                loginUser(email,password);
            }
        });
    }

    private void loginUser(String username, String password) {
        Log.i(TAG, "Attempting to login user " + username);
        ApolloClient apolloClient = ApolloClient.builder()
                .serverUrl("http://10.0.2.2:3001/graphql")
                .build();

        apolloClient.mutate(new LoginMutation(new LoginInput(etEmail.getText().toString(), etPassword.getText().toString())))
        .enqueue( new ApolloCall.Callback<LoginMutation.Data>() {

            @Override
            public void onResponse(@NonNull Response<LoginMutation.Data> response) {
                Log.i(TAG, "Login success for :" + username);
                goMainActivity();
            }

            @Override
            public void onFailure(@NonNull ApolloException e) {
                Log.i(TAG, "Login failed for: " + username);
                Log.i(TAG, e.toString());
            }
        } );
    }

    private void goMainActivity() {
        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);
        finish();
    }
}
