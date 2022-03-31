Each mongoose schema has dedicated classes (services) which encapsulate the
query methods for a schema. For example, the user service class controls exactly
what we can query or modify on the User collection through code. The user service
has methods such as createUser and getUser which interact directly with mongodb through
mongoose.
This helps separate the query logic, validation, etc. from the graphql resolvers.
To create more functionality and capability within the resolvers, we just need to add more
methods in the service class
