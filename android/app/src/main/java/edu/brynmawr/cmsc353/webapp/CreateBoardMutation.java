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

public final class CreateBoardMutation implements Mutation<CreateBoardMutation.Data, CreateBoardMutation.Data, CreateBoardMutation.Variables> {
  public static final String OPERATION_ID = "af86813f8bda255b5b9b891218a6f3a1de69bdf69762562db07edeb78a1aa082";

  public static final String QUERY_DOCUMENT = QueryDocumentMinifier.minify(
    "mutation createBoard($creatorDetails: UserIdInput!, $input: CreateBoardInput!) {\n"
        + "  createBoard(input: $input, creatorDetails: $creatorDetails) {\n"
        + "    __typename\n"
        + "    name\n"
        + "    description\n"
        + "  }\n"
        + "}"
  );

  public static final OperationName OPERATION_NAME = new OperationName() {
    @Override
    public String name() {
      return "createBoard";
    }
  };

  private final Variables variables;

  public CreateBoardMutation(@NotNull UserIdInput creatorDetails, @NotNull CreateBoardInput input) {
    Utils.checkNotNull(creatorDetails, "creatorDetails == null");
    Utils.checkNotNull(input, "input == null");
    variables = new Variables(creatorDetails, input);
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
    private @NotNull UserIdInput creatorDetails;

    private @NotNull CreateBoardInput input;

    Builder() {
    }

    public Builder creatorDetails(@NotNull UserIdInput creatorDetails) {
      this.creatorDetails = creatorDetails;
      return this;
    }

    public Builder input(@NotNull CreateBoardInput input) {
      this.input = input;
      return this;
    }

    public CreateBoardMutation build() {
      Utils.checkNotNull(creatorDetails, "creatorDetails == null");
      Utils.checkNotNull(input, "input == null");
      return new CreateBoardMutation(creatorDetails, input);
    }
  }

  public static final class Variables extends Operation.Variables {
    private final @NotNull UserIdInput creatorDetails;

    private final @NotNull CreateBoardInput input;

    private final transient Map<String, Object> valueMap = new LinkedHashMap<>();

    Variables(@NotNull UserIdInput creatorDetails, @NotNull CreateBoardInput input) {
      this.creatorDetails = creatorDetails;
      this.input = input;
      this.valueMap.put("creatorDetails", creatorDetails);
      this.valueMap.put("input", input);
    }

    public @NotNull UserIdInput creatorDetails() {
      return creatorDetails;
    }

    public @NotNull CreateBoardInput input() {
      return input;
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
          writer.writeObject("creatorDetails", creatorDetails.marshaller());
          writer.writeObject("input", input.marshaller());
        }
      };
    }
  }

  /**
   * Data from the response after executing this GraphQL operation
   */
  public static class Data implements Operation.Data {
    static final ResponseField[] $responseFields = {
      ResponseField.forObject("createBoard", "createBoard", new UnmodifiableMapBuilder<String, Object>(2)
      .put("input", new UnmodifiableMapBuilder<String, Object>(2)
        .put("kind", "Variable")
        .put("variableName", "input")
        .build())
      .put("creatorDetails", new UnmodifiableMapBuilder<String, Object>(2)
        .put("kind", "Variable")
        .put("variableName", "creatorDetails")
        .build())
      .build(), false, Collections.<ResponseField.Condition>emptyList())
    };

    final @NotNull CreateBoard createBoard;

    private transient volatile String $toString;

    private transient volatile int $hashCode;

    private transient volatile boolean $hashCodeMemoized;

    public Data(@NotNull CreateBoard createBoard) {
      this.createBoard = Utils.checkNotNull(createBoard, "createBoard == null");
    }

    public @NotNull CreateBoard createBoard() {
      return this.createBoard;
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseFieldMarshaller marshaller() {
      return new ResponseFieldMarshaller() {
        @Override
        public void marshal(ResponseWriter writer) {
          writer.writeObject($responseFields[0], createBoard.marshaller());
        }
      };
    }

    @Override
    public String toString() {
      if ($toString == null) {
        $toString = "Data{"
          + "createBoard=" + createBoard
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
        return this.createBoard.equals(that.createBoard);
      }
      return false;
    }

    @Override
    public int hashCode() {
      if (!$hashCodeMemoized) {
        int h = 1;
        h *= 1000003;
        h ^= createBoard.hashCode();
        $hashCode = h;
        $hashCodeMemoized = true;
      }
      return $hashCode;
    }

    public static final class Mapper implements ResponseFieldMapper<Data> {
      final CreateBoard.Mapper createBoardFieldMapper = new CreateBoard.Mapper();

      @Override
      public Data map(ResponseReader reader) {
        final CreateBoard createBoard = reader.readObject($responseFields[0], new ResponseReader.ObjectReader<CreateBoard>() {
          @Override
          public CreateBoard read(ResponseReader reader) {
            return createBoardFieldMapper.map(reader);
          }
        });
        return new Data(createBoard);
      }
    }
  }

  public static class CreateBoard {
    static final ResponseField[] $responseFields = {
      ResponseField.forString("__typename", "__typename", null, false, Collections.<ResponseField.Condition>emptyList()),
      ResponseField.forString("name", "name", null, false, Collections.<ResponseField.Condition>emptyList()),
      ResponseField.forString("description", "description", null, false, Collections.<ResponseField.Condition>emptyList())
    };

    final @NotNull String __typename;

    final @NotNull String name;

    final @NotNull String description;

    private transient volatile String $toString;

    private transient volatile int $hashCode;

    private transient volatile boolean $hashCodeMemoized;

    public CreateBoard(@NotNull String __typename, @NotNull String name,
        @NotNull String description) {
      this.__typename = Utils.checkNotNull(__typename, "__typename == null");
      this.name = Utils.checkNotNull(name, "name == null");
      this.description = Utils.checkNotNull(description, "description == null");
    }

    public @NotNull String __typename() {
      return this.__typename;
    }

    public @NotNull String name() {
      return this.name;
    }

    public @NotNull String description() {
      return this.description;
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseFieldMarshaller marshaller() {
      return new ResponseFieldMarshaller() {
        @Override
        public void marshal(ResponseWriter writer) {
          writer.writeString($responseFields[0], __typename);
          writer.writeString($responseFields[1], name);
          writer.writeString($responseFields[2], description);
        }
      };
    }

    @Override
    public String toString() {
      if ($toString == null) {
        $toString = "CreateBoard{"
          + "__typename=" + __typename + ", "
          + "name=" + name + ", "
          + "description=" + description
          + "}";
      }
      return $toString;
    }

    @Override
    public boolean equals(Object o) {
      if (o == this) {
        return true;
      }
      if (o instanceof CreateBoard) {
        CreateBoard that = (CreateBoard) o;
        return this.__typename.equals(that.__typename)
         && this.name.equals(that.name)
         && this.description.equals(that.description);
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
        h ^= name.hashCode();
        h *= 1000003;
        h ^= description.hashCode();
        $hashCode = h;
        $hashCodeMemoized = true;
      }
      return $hashCode;
    }

    public static final class Mapper implements ResponseFieldMapper<CreateBoard> {
      @Override
      public CreateBoard map(ResponseReader reader) {
        final String __typename = reader.readString($responseFields[0]);
        final String name = reader.readString($responseFields[1]);
        final String description = reader.readString($responseFields[2]);
        return new CreateBoard(__typename, name, description);
      }
    }
  }
}
