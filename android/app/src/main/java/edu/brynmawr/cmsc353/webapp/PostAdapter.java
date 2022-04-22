package edu.brynmawr.cmsc353.webapp;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class PostAdapter extends RecyclerView.Adapter<PostAdapter.ViewHolder> {

    Context context;
    List<Post> posts;
    String email;

    public PostAdapter(Context context, List<Post> posts, String email) {
        this.context = context;
        this.posts = posts;
        this.email = email;
    }


    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View postView = LayoutInflater.from(context).inflate(R.layout.item_post, parent, false);
        return new ViewHolder(postView);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Post post = posts.get(position);
        holder.bind(post);
    }

    @Override
    public int getItemCount() {
        return posts.size();
    }


    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvName;
        TextView   tvDescription;
        RelativeLayout container;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.tvName);
            tvDescription= itemView.findViewById(R.id.tvDescription);
            container = itemView.findViewById(R.id.container);
        }

        public void bind(Post post) {
            tvName.setText(post.getTitle());
            tvDescription.setText(post.getContent());
            container.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent i = new Intent(context, CommentActivity.class);
                    i.putExtra("postName",  post.title);
                    i.putExtra("postContent",post.content);
                    i.putExtra("postID", post.id);
                    i.putExtra("boardName", post.boardName);
                    i.putExtra("email", email);
                    context.startActivity(i);
                }
            });
        }
    }
}
