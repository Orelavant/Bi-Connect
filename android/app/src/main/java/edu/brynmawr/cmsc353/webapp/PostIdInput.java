// AUTO-GENERATED FILE. DO NOT MODIFY.
//
// This class was automatically generated by Apollo GraphQL plugin from the GraphQL queries it found.
// It should not be modified by hand.
//
package edu.brynmawr.cmsc353.webapp;

import com.apollographql.apollo.api.InputType;
import com.apollographql.apollo.api.internal.InputFieldMarshaller;
import com.apollographql.apollo.api.internal.InputFieldWriter;
import com.apollographql.apollo.api.internal.Utils;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;

public final class PostIdInput implements InputType {
  private final @NotNull String _id;

  private transient volatile int $hashCode;

  private transient volatile boolean $hashCodeMemoized;

  PostIdInput(@NotNull String _id) {
    this._id = _id;
  }

  public @NotNull String _id() {
    return this._id;
  }

  public static Builder builder() {
    return new Builder();
  }

  @Override
  public InputFieldMarshaller marshaller() {
    return new InputFieldMarshaller() {
      @Override
      public void marshal(InputFieldWriter writer) throws IOException {
        writer.writeString("_id", _id);
      }
    };
  }

  @Override
  public int hashCode() {
    if (!$hashCodeMemoized) {
      int h = 1;
      h *= 1000003;
      h ^= _id.hashCode();
      $hashCode = h;
      $hashCodeMemoized = true;
    }
    return $hashCode;
  }

  @Override
  public boolean equals(Object o) {
    if (o == this) {
      return true;
    }
    if (o instanceof PostIdInput) {
      PostIdInput that = (PostIdInput) o;
      return this._id.equals(that._id);
    }
    return false;
  }

  public static final class Builder {
    private @NotNull String _id;

    Builder() {
    }

    public Builder _id(@NotNull String _id) {
      this._id = _id;
      return this;
    }

    public PostIdInput build() {
      Utils.checkNotNull(_id, "_id == null");
      return new PostIdInput(_id);
    }
  }
}