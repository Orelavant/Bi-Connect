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

import java.io.IOException;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import okio.Buffer;
import okio.BufferedSource;
import okio.ByteString;

public final class CreateCommentMutation implements Mutation<CreateCommentMutation.Data, CreateCommentMutation.Data, CreateCommentMutation.Variables> {
  public static final String OPERATION_ID = "0c58b5e387a1fb2c91ef6d8b7823beacb6569ea7bbe6e562c45628f897f21f84";

  public static final String QUERY_DOCUMENT = QueryDocumentMinifier.minify(
    "mutation createComment($input: CreateCommentInput!, $postDetails: PostIdInput!, $creatorDetails: UserIdInput!) {\n"
        + "  createComment(input: $input, postDetails: $postDetails, creatorDetails: $creatorDetails) {\n"
        + "    __typename\n"
        + "    _id\n"
        + "  }\n"
        + "}"
  );

  public static final OperationName OPERATION_NAME = new OperationName() {
    @Override
    public String name() {
      return "createComment";
    }
  };

  private final Variables variables;

  public CreateCommentMutation(@NotNull CreateCommentInput input, @NotNull PostIdInput postDetails,
                               @NotNull UserIdInput creatorDetails) {
    Utils.checkNotNull(input, "input == null");
    Utils.checkNotNull(postDetails, "postDetails == null");
    Utils.checkNotNull(creatorDetails, "creatorDetails == null");
    variables = new Variables(input, postDetails, creatorDetails);
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
    private @NotNull CreateCommentInput input;

    private @NotNull PostIdInput postDetails;

    private @NotNull UserIdInput creatorDetails;

    Builder() {
    }

    public Builder input(@NotNull CreateCommentInput input) {
      this.input = input;
      return this;
    }

    public Builder postDetails(@NotNull PostIdInput postDetails) {
      this.postDetails = postDetails;
      return this;
    }

    public Builder creatorDetails(@NotNull UserIdInput creatorDetails) {
      this.creatorDetails = creatorDetails;
      return this;
    }

    public CreateCommentMutation build() {
      Utils.checkNotNull(input, "input == null");
      Utils.checkNotNull(postDetails, "postDetails == null");
      Utils.checkNotNull(creatorDetails, "creatorDetails == null");
      return new CreateCommentMutation(input, postDetails, creatorDetails);
    }
  }

  public static final class Variables extends Operation.Variables {
    private final @NotNull CreateCommentInput input;

    private final @NotNull PostIdInput postDetails;

    private final @NotNull UserIdInput creatorDetails;

    private final transient Map<String, Object> valueMap = new LinkedHashMap<>();

    Variables(@NotNull CreateCommentInput input, @NotNull PostIdInput postDetails,
        @NotNull UserIdInput creatorDetails) {
      this.input = input;
      this.postDetails = postDetails;
      this.creatorDetails = creatorDetails;
      this.valueMap.put("input", input);
      this.valueMap.put("postDetails", postDetails);
      this.valueMap.put("creatorDetails", creatorDetails);
    }

    public @NotNull CreateCommentInput input() {
      return input;
    }

    public @NotNull PostIdInput postDetails() {
      return postDetails;
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
          writer.writeObject("postDetails", postDetails.marshaller());
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
      ResponseField.forObject("createComment", "createComment", new UnmodifiableMapBuilder<String, Object>(3)
      .put("input", new UnmodifiableMapBuilder<String, Object>(2)
        .put("kind", "Variable")
        .put("variableName", "input")
        .build())
      .put("postDetails", new UnmodifiableMapBuilder<String, Object>(2)
        .put("kind", "Variable")
        .put("variableName", "postDetails")
        .build())
      .put("creatorDetails", new UnmodifiableMapBuilder<String, Object>(2)
        .put("kind", "Variable")
        .put("variableName", "creatorDetails")
        .build())
      .build(), false, Collections.<ResponseField.Condition>emptyList())
    };

    final @NotNull CreateComment createComment;

    private transient volatile String $toString;

    private transient volatile int $hashCode;

    private transient volatile boolean $hashCodeMemoized;

    public Data(@NotNull CreateComment createComment) {
      this.createComment = Utils.checkNotNull(createComment, "createComment == null");
    }

    public @NotNull CreateComment createComment() {
      return this.createComment;
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseFieldMarshaller marshaller() {
      return new ResponseFieldMarshaller() {
        @Override
        public void marshal(ResponseWriter writer) {
          writer.writeObject($responseFields[0], createComment.marshaller());
        }
      };
    }

    @Override
    public String toString() {
      if ($toString == null) {
        $toString = "Data{"
          + "createComment=" + createComment
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
        return this.createComment.equals(that.createComment);
      }
      return false;
    }

    @Override
    public int hashCode() {
      if (!$hashCodeMemoized) {
        int h = 1;
        h *= 1000003;
        h ^= createComment.hashCode();
        $hashCode = h;
        $hashCodeMemoized = true;
      }
      return $hashCode;
    }

    public static final class Mapper implements ResponseFieldMapper<Data> {
      final CreateComment.Mapper createCommentFieldMapper = new CreateComment.Mapper();

      @Override
      public Data map(ResponseReader reader) {
        final CreateComment createComment = reader.readObject($responseFields[0], new ResponseReader.ObjectReader<CreateComment>() {
          @Override
          public CreateComment read(ResponseReader reader) {
            return createCommentFieldMapper.map(reader);
          }
        });
        return new Data(createComment);
      }
    }
  }

  public static class CreateComment {
    static final ResponseField[] $responseFields = {
      ResponseField.forString("__typename", "__typename", null, false, Collections.<ResponseField.Condition>emptyList()),
      ResponseField.forString("_id", "_id", null, false, Collections.<ResponseField.Condition>emptyList())
    };

    final @NotNull String __typename;

    final @NotNull String _id;

    private transient volatile String $toString;

    private transient volatile int $hashCode;

    private transient volatile boolean $hashCodeMemoized;

    public CreateComment(@NotNull String __typename, @NotNull String _id) {
      this.__typename = Utils.checkNotNull(__typename, "__typename == null");
      this._id = Utils.checkNotNull(_id, "_id == null");
    }

    public @NotNull String __typename() {
      return this.__typename;
    }

    public @NotNull String _id() {
      return this._id;
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseFieldMarshaller marshaller() {
      return new ResponseFieldMarshaller() {
        @Override
        public void marshal(ResponseWriter writer) {
          writer.writeString($responseFields[0], __typename);
          writer.writeString($responseFields[1], _id);
        }
      };
    }

    @Override
    public String toString() {
      if ($toString == null) {
        $toString = "CreateComment{"
          + "__typename=" + __typename + ", "
          + "_id=" + _id
          + "}";
      }
      return $toString;
    }

    @Override
    public boolean equals(Object o) {
      if (o == this) {
        return true;
      }
      if (o instanceof CreateComment) {
        CreateComment that = (CreateComment) o;
        return this.__typename.equals(that.__typename)
         && this._id.equals(that._id);
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
        h ^= _id.hashCode();
        $hashCode = h;
        $hashCodeMemoized = true;
      }
      return $hashCode;
    }

    public static final class Mapper implements ResponseFieldMapper<CreateComment> {
      @Override
      public CreateComment map(ResponseReader reader) {
        final String __typename = reader.readString($responseFields[0]);
        final String _id = reader.readString($responseFields[1]);
        return new CreateComment(__typename, _id);
      }
    }
  }
}
