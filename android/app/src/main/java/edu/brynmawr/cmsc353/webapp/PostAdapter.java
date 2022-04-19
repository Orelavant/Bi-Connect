package edu.brynmawr.cmsc353.webapp;

import androidx.recyclerview.widget.RecyclerView;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;

import java.util.List;

public class BoardAdapter extends RecyclerView.Adapter<BoardAdapter.ViewHolder> {

    Context context;
    List<Board> boards;

    public BoardAdapter(Context context, List<Board> boards) {
        this.context = context;
        this.boards = boards;
    }


    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View boardView = LayoutInflater.from(context).inflate(R.layout.item_board, parent, false);
        return new ViewHolder(boardView);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Board board = boards.get(position);
        holder.bind(board);
    }

    @Override
    public int getItemCount() {
        return boards.size();
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

        public void bind(Board board) {
            tvName.setText(board.getName());
            tvDescription.setText(board.getDescription());
            //This is for going into the board later
//            container.setOnClickListener(new View.OnClickListener() {
//                @Override
//                public void onClick(View v) {
//                    Intent i = new Intent(context, detailActivity.class);
//                    i.putExtra("title", movie.getTitle());
//                    i.putExtra("movie", Parcels.wrap(movie));
//                    context.startActivity(i);
//                }
//            });
        }
    }
}
