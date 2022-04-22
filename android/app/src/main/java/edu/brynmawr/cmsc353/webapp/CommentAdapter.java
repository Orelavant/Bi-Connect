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

public class CommentAdapter extends RecyclerView.Adapter<CommentAdapter.ViewHolder> {

    Context context;
    List<Comment> comments;

    public CommentAdapter(Context context, List<Comment> comments) {
        this.context = context;
        this.comments = comments;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View commentView = LayoutInflater.from(context).inflate(R.layout.item_comment, parent, false);
        return new ViewHolder(commentView);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Comment comment = comments.get(position);
        if(comment != null) {
            holder.bind(comment);
        }
    }

    @Override
    public int getItemCount() {
        return comments.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvUser;
        TextView tvContent;
        RelativeLayout container;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvUser = itemView.findViewById(R.id.tvUser);
            tvContent= itemView.findViewById(R.id.tvContent);
            container = itemView.findViewById(R.id.container);
        }

        public void bind(Comment comment) {
            if(tvUser != null) {
                tvUser.setText(comment.getUser());
            }
            if(tvContent != null) {
                tvContent.setText(comment.getContent());
            }
        }
    }
}
