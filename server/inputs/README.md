Each schema that we want to expose has a input file which describes the possbile
input types for parameters in graphql queries and mutations. An input type is a grouping
of parameters under one name (a js object). This prevents repitition in code as these types
are often resued and helps ease writing the body of a query. Input types are used by resolvers and
services.

Input types are classes decorated by @InputType from type-graphql and are similar to the
definition of a schema. The only addition is that here certain fields have decorators
from class-validators that help restrict and validate the values of instances of the types.
