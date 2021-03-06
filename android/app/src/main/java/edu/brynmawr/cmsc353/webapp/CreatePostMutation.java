package edu.brynmawr.cmsc353.webapp;// AUTO-GENERATED FILE. DO NOT MODIFY.
//
// This class was automatically generated by Apollo GraphQL plugin from the GraphQL queries it found.
// It should not be modified by hand.
//

import com.apollographql.apollo.api.Mutation;
import com.apollographql.apollo.api.Operation;
import com.apollographql.apollo.api.OperationName;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.api.ResponseField;
import com.apollographql.apollo.api.ScalarTypeAdapters;
import com.apollographql.apollo.api.internal.InputFieldMarshaller;
import com.apollographql.apollo.api.internal.InputFieldWriter;
import com.apollographql.apollo.api.internal.OperationRequestBodyComposer;
import com.apollographql.apollo.api.internal.QueryDocumentMinifier;
import com.apollographql.apollo.api.internal.ResponseFieldMapper;
import com.apollographql.apollo.api.internal.ResponseFieldMarshaller;
import com.apollographql.apollo.api.internal.ResponseReader;
import com.apollographql.apollo.api.internal.ResponseWriter;
import com.apollographql.apollo.api.internal.SimpleOperationResponseParser;
import com.apollographql.apollo.api.internal.UnmodifiableMapBuilder;
import com.apollographql.apollo.api.internal.Utils;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.io.IOException;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import okio.Buffer;
import okio.BufferedSource;
import okio.ByteString;

public final class CreatePostMutation implements Mutation<CreatePostMutation.Data, CreatePostMutation.Data, CreatePostMutation.Variables> {
  public static final String OPERATION_ID = "0eebe4291869fccfca1fb4be3d3717e1e1bb524442705a65f29ec716038bb550";

  public static final String QUERY_DOCUMENT = QueryDocumentMinifier.minify(
    "mutation createPost($input: CreatePostInput!, $boardDetails: BoardIdInput!, $creatorDetails: UserIdInput!) {\n"
        + "  createPost(input: $input, boardDetails: $boardDetails, creatorDetails: $creatorDetails) {\n"
        + "    __typename\n"
        + "    creatorName\n"
        + "    title\n"
        + "    content\n"
        + "    boardName\n"
        + "  }\n"
        + "}"
  );

  public static final OperationName OPERATION_NAME = new OperationName() {
    @Override
    public String name() {
      return "createPost";
    }
  };

  private final Variables variables;

  public CreatePostMutation(@NotNull CreatePostInput input, @NotNull BoardIdInput boardDetails,
                            @NotNull UserIdInput creatorDetails) {
    Utils.checkNotNull(input, "input == null");
    Utils.checkNotNull(boardDetails, "boardDetails == null");
    Utils.checkNotNull(creatorDetails, "creatorDetails == null");
    variables = new Variables(input, boardDetails, creatorDetails);
  }

  @Override
  public String operationId() {
    return OPERATION_ID;
  }

  @Override
  public String queryDocument() {
    return QUERY_DOCUMENT;
  }

  @Override
  public Data wrapData(Data data) {
    return data;
  }

  @Override
  public Variables variables() {
    return variables;
  }

  @Override
  public ResponseFieldMapper<Data> responseFieldMapper() {
    return new Data.Mapper();
  }

  public static Builder builder() {
    return new Builder();
  }

  @Override
  public OperationName name() {
    return OPERATION_NAME;
  }

  @Override
  @NotNull
  public Response<Data> parse(@NotNull final BufferedSource source,
                              @NotNull final ScalarTypeAdapters scalarTypeAdapters) throws IOException {
    return SimpleOperationResponseParser.parse(source, this, scalarTypeAdapters);
  }

  @Override
  @NotNull
  public Response<Data> parse(@NotNull final ByteString byteString,
                              @NotNull final ScalarTypeAdapters scalarTypeAdapters) throws IOException {
    return parse(new Buffer().write(byteString), scalarTypeAdapters);
  }

  @Override
  @NotNull
  public Response<Data> parse(@NotNull final BufferedSource source) throws
      IOException {
    return parse(source, ScalarTypeAdapters.DEFAULT);
  }

  @Override
  @NotNull
  public Response<Data> parse(@NotNull final ByteString byteString) throws
      IOException {
    return parse(byteString, ScalarTypeAdapters.DEFAULT);
  }

  @Override
  @NotNull
  public ByteString composeRequestBody(@NotNull final ScalarTypeAdapters scalarTypeAdapters) {
    return OperationRequestBodyComposer.compose(this, false, true, scalarTypeAdapters);
  }

  @NotNull
  @Override
  public ByteString composeRequestBody() {
    return OperationRequestBodyComposer.compose(this, false, true, ScalarTypeAdapters.DEFAULT);
  }

  @Override
  @NotNull
  public ByteString composeRequestBody(final boolean autoPersistQueries,
      final boolean withQueryDocument, @NotNull final ScalarTypeAdapters scalarTypeAdapters) {
    return OperationRequestBodyComposer.compose(this, autoPersistQueries, withQueryDocument, scalarTypeAdapters);
  }

  public static final class Builder {
    private @NotNull CreatePostInput input;

    private @NotNull BoardIdInput boardDetails;

    private @NotNull UserIdInput creatorDetails;

    Builder() {
    }

    public Builder input(@NotNull CreatePostInput input) {
      this.input = input;
      return this;
    }

    public Builder boardDetails(@NotNull BoardIdInput boardDetails) {
      this.boardDetails = boardDetails;
      return this;
    }

    public Builder creatorDetails(@NotNull UserIdInput creatorDetails) {
      this.creatorDetails = creatorDetails;
      return this;
    }

    public CreatePostMutation build() {
      Utils.checkNotNull(input, "input == null");
      Utils.checkNotNull(boardDetails, "boardDetails == null");
      Utils.checkNotNull(creatorDetails, "creatorDetails == null");
      return new CreatePostMutation(input, boardDetails, creatorDetails);
    }
  }

  public static final class Variables extends Operation.Variables {
    private final @NotNull CreatePostInput input;

    private final @NotNull BoardIdInput boardDetails;

    private final @NotNull UserIdInput creatorDetails;

    private final transient Map<String, Object> valueMap = new LinkedHashMap<>();

    Variables(@NotNull CreatePostInput input, @NotNull BoardIdInput boardDetails,
        @NotNull UserIdInput creatorDetails) {
      this.input = input;
      this.boardDetails = boardDetails;
      this.creatorDetails = creatorDetails;
      this.valueMap.put("input", input);
      this.valueMap.put("boardDetails", boardDetails);
      this.valueMap.put("creatorDetails", creatorDetails);
    }

    public @NotNull CreatePostInput input() {
      return input;
    }

    public @NotNull BoardIdInput boardDetails() {
      return boardDetails;
    }

    public @NotNull UserIdInput creatorDetails() {
      return creatorDetails;
    }

    @Override
    public Map<String, Object> valueMap() {
      return Collections.unmodifiableMap(valueMap);
    }

    @Override
    public InputFieldMarshaller marshaller() {
      return new InputFieldMarshaller() {
        @Override
        public void marshal(InputFieldWriter writer) throws IOException {
          writer.writeObject("input", input.marshaller());
          writer.writeObject("boardDetails", boardDetails.marshaller());
          writer.writeObject("creatorDetails", creatorDetails.marshaller());
        }
      };
    }
  }

  /**
   * Data from the response after executing this GraphQL operation
   */
  public static class Data implements Operation.Data {
    static final ResponseField[] $responseFields = {
      ResponseField.forObject("createPost", "createPost", new UnmodifiableMapBuilder<String, Object>(3)
      .put("input", new UnmodifiableMapBuilder<String, Object>(2)
        .put("kind", "Variable")
        .put("variableName", "input")
        .build())
      .put("boardDetails", new UnmodifiableMapBuilder<String, Object>(2)
        .put("kind", "Variable")
        .put("variableName", "boardDetails")
        .build())
      .put("creatorDetails", new UnmodifiableMapBuilder<String, Object>(2)
        .put("kind", "Variable")
        .put("variableName", "creatorDetails")
        .build())
      .build(), false, Collections.<ResponseField.Condition>emptyList())
    };

    final @NotNull CreatePost createPost;

    private transient volatile String $toString;

    private transient volatile int $hashCode;

    private transient volatile boolean $hashCodeMemoized;

    public Data(@NotNull CreatePost createPost) {
      this.createPost = Utils.checkNotNull(createPost, "createPost == null");
    }

    public @NotNull CreatePost createPost() {
      return this.createPost;
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseFieldMarshaller marshaller() {
      return new ResponseFieldMarshaller() {
        @Override
        public void marshal(ResponseWriter writer) {
          writer.writeObject($responseFields[0], createPost.marshaller());
        }
      };
    }

    @Override
    public String toString() {
      if ($toString == null) {
        $toString = "Data{"
          + "createPost=" + createPost
          + "}";
      }
      return $toString;
    }

    @Override
    public boolean equals(Object o) {
      if (o == this) {
        return true;
      }
      if (o instanceof Data) {
        Data that = (Data) o;
        return this.createPost.equals(that.createPost);
      }
      return false;
    }

    @Override
    public int hashCode() {
      if (!$hashCodeMemoized) {
        int h = 1;
        h *= 1000003;
        h ^= createPost.hashCode();
        $hashCode = h;
        $hashCodeMemoized = true;
      }
      return $hashCode;
    }

    public static final class Mapper implements ResponseFieldMapper<Data> {
      final CreatePost.Mapper createPostFieldMapper = new CreatePost.Mapper();

      @Override
      public Data map(ResponseReader reader) {
        final CreatePost createPost = reader.readObject($responseFields[0], new ResponseReader.ObjectReader<CreatePost>() {
          @Override
          public CreatePost read(ResponseReader reader) {
            return createPostFieldMapper.map(reader);
          }
        });
        return new Data(createPost);
      }
    }
  }

  public static class CreatePost {
    static final ResponseField[] $responseFields = {
      ResponseField.forString("__typename", "__typename", null, false, Collections.<ResponseField.Condition>emptyList()),
      ResponseField.forString("creatorName", "creatorName", null, true, Collections.<ResponseField.Condition>emptyList()),
      ResponseField.forString("title", "title", null, true, Collections.<ResponseField.Condition>emptyList()),
      ResponseField.forString("content", "content", null, false, Collections.<ResponseField.Condition>emptyList()),
      ResponseField.forString("boardName", "boardName", null, false, Collections.<ResponseField.Condition>emptyList())
    };

    final @NotNull String __typename;

    final @Nullable String creatorName;

    final @Nullable String title;

    final @NotNull String content;

    final @NotNull String boardName;

    private transient volatile String $toString;

    private transient volatile int $hashCode;

    private transient volatile boolean $hashCodeMemoized;

    public CreatePost(@NotNull String __typename, @Nullable String creatorName,
        @Nullable String title, @NotNull String content, @NotNull String boardName) {
      this.__typename = Utils.checkNotNull(__typename, "__typename == null");
      this.creatorName = creatorName;
      this.title = title;
      this.content = Utils.checkNotNull(content, "content == null");
      this.boardName = Utils.checkNotNull(boardName, "boardName == null");
    }

    public @NotNull String __typename() {
      return this.__typename;
    }

    public @Nullable String creatorName() {
      return this.creatorName;
    }

    public @Nullable String title() {
      return this.title;
    }

    public @NotNull String content() {
      return this.content;
    }

    public @NotNull String boardName() {
      return this.boardName;
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseFieldMarshaller marshaller() {
      return new ResponseFieldMarshaller() {
        @Override
        public void marshal(ResponseWriter writer) {
          writer.writeString($responseFields[0], __typename);
          writer.writeString($responseFields[1], creatorName);
          writer.writeString($responseFields[2], title);
          writer.writeString($responseFields[3], content);
          writer.writeString($responseFields[4], boardName);
        }
      };
    }

    @Override
    public String toString() {
      if ($toString == null) {
        $toString = "CreatePost{"
          + "__typename=" + __typename + ", "
          + "creatorName=" + creatorName + ", "
          + "title=" + title + ", "
          + "content=" + content + ", "
          + "boardName=" + boardName
          + "}";
      }
      return $toString;
    }

    @Override
    public boolean equals(Object o) {
      if (o == this) {
        return true;
      }
      if (o instanceof CreatePost) {
        CreatePost that = (CreatePost) o;
        return this.__typename.equals(that.__typename)
         && ((this.creatorName == null) ? (that.creatorName == null) : this.creatorName.equals(that.creatorName))
         && ((this.title == null) ? (that.title == null) : this.title.equals(that.title))
         && this.content.equals(that.content)
         && this.boardName.equals(that.boardName);
      }
      return false;
    }

    @Override
    public int hashCode() {
      if (!$hashCodeMemoized) {
        int h = 1;
        h *= 1000003;
        h ^= __typename.hashCode();
        h *= 1000003;
        h ^= (creatorName == null) ? 0 : creatorName.hashCode();
        h *= 1000003;
        h ^= (title == null) ? 0 : title.hashCode();
        h *= 1000003;
        h ^= content.hashCode();
        h *= 1000003;
        h ^= boardName.hashCode();
        $hashCode = h;
        $hashCodeMemoized = true;
      }
      return $hashCode;
    }

    public static final class Mapper implements ResponseFieldMapper<CreatePost> {
      @Override
      public CreatePost map(ResponseReader reader) {
        final String __typename = reader.readString($responseFields[0]);
        final String creatorName = reader.readString($responseFields[1]);
        final String title = reader.readString($responseFields[2]);
        final String content = reader.readString($responseFields[3]);
        final String boardName = reader.readString($responseFields[4]);
        return new CreatePost(__typename, creatorName, title, content, boardName);
      }
    }
  }
}
