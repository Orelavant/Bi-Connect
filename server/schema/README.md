Each entity has its own schema file where its schema is defined

A schema is a class with attriutes that correspond to the fields in mongodb
We decorate each attribute to let typegoose/mongoose/type-graphql know about
meta properites.

@ObjectType lets graphql use the class as a graphql type

@Field exposes the field to graphql and lets it know what type to expect. So,
if we don't want to expose a field in the api like a user password, we don't decorate
the field.

Typegoose has a number of decorators that we use. For example,
@prop tells typegoose the properties of the fields of the schema. This helps typegoose
restrict, default, etc. fields.
@pre tells typegoose a preprocessing function to run on a certain event like save

We have a base schema file that certain schema can extend to avoid repitition of fields.
For example, we have a Timestamp schema that defines the createdAt and updatedAt fields
which we extend all our schemas by.

We have a models file where the schemas are used to generate the typegoose model class
automatically. The typegoose models define the collections and the shapes of the documents
it expects to interact with in mongodb.
