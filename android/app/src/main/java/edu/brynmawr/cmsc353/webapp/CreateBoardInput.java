// AUTO-GENERATED FILE. DO NOT MODIFY.
//
// This class was automatically generated by Apollo GraphQL plugin from the GraphQL queries it found.
// It should not be modified by hand.
//
package edu.brynmawr.cmsc353.webapp;

import com.apollographql.apollo.api.Input;
import com.apollographql.apollo.api.InputType;
import com.apollographql.apollo.api.internal.InputFieldMarshaller;
import com.apollographql.apollo.api.internal.InputFieldWriter;
import com.apollographql.apollo.api.internal.Utils;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.io.IOException;

public final class CreateBoardInput implements InputType {
  private final @NotNull String name;

  private final Input<String> description;

  private final Input<String> picture;

  private final Input<String> banner;

  private transient volatile int $hashCode;

  private transient volatile boolean $hashCodeMemoized;

  public CreateBoardInput(@NotNull String name, Input<String> description, Input<String> picture,
      Input<String> banner) {
    this.name = name;
    this.description = description;
    this.picture = picture;
    this.banner = banner;
  }

  public @NotNull String name() {
    return this.name;
  }

  public @Nullable String description() {
    return this.description.value;
  }

  public @Nullable String picture() {
    return this.picture.value;
  }

  public @Nullable String banner() {
    return this.banner.value;
  }

  public static Builder builder() {
    return new Builder();
  }

  @Override
  public InputFieldMarshaller marshaller() {
    return new InputFieldMarshaller() {
      @Override
      public void marshal(InputFieldWriter writer) throws IOException {
        writer.writeString("name", name);
        if (description.defined) {
          writer.writeString("description", description.value);
        }
        if (picture.defined) {
          writer.writeString("picture", picture.value);
        }
        if (banner.defined) {
          writer.writeString("banner", banner.value);
        }
      }
    };
  }

  @Override
  public int hashCode() {
    if (!$hashCodeMemoized) {
      int h = 1;
      h *= 1000003;
      h ^= name.hashCode();
      h *= 1000003;
      h ^= description.hashCode();
      h *= 1000003;
      h ^= picture.hashCode();
      h *= 1000003;
      h ^= banner.hashCode();
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
    if (o instanceof CreateBoardInput) {
      CreateBoardInput that = (CreateBoardInput) o;
      return this.name.equals(that.name)
       && this.description.equals(that.description)
       && this.picture.equals(that.picture)
       && this.banner.equals(that.banner);
    }
    return false;
  }

  public static final class Builder {
    private @NotNull String name;

    private Input<String> description = Input.absent();

    private Input<String> picture = Input.absent();

    private Input<String> banner = Input.absent();

    Builder() {
    }

    public Builder name(@NotNull String name) {
      this.name = name;
      return this;
    }

    public Builder description(@Nullable String description) {
      this.description = Input.fromNullable(description);
      return this;
    }

    public Builder picture(@Nullable String picture) {
      this.picture = Input.fromNullable(picture);
      return this;
    }

    public Builder banner(@Nullable String banner) {
      this.banner = Input.fromNullable(banner);
      return this;
    }

    public Builder descriptionInput(@NotNull Input<String> description) {
      this.description = Utils.checkNotNull(description, "description == null");
      return this;
    }

    public Builder pictureInput(@NotNull Input<String> picture) {
      this.picture = Utils.checkNotNull(picture, "picture == null");
      return this;
    }

    public Builder bannerInput(@NotNull Input<String> banner) {
      this.banner = Utils.checkNotNull(banner, "banner == null");
      return this;
    }

    public CreateBoardInput build() {
      Utils.checkNotNull(name, "name == null");
      return new CreateBoardInput(name, description, picture, banner);
    }
  }
}
