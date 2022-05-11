import { FieldNode, GraphQLResolveInfo, Kind, SelectionSetNode } from 'graphql';

export function generateInclude(selectionSet: SelectionSetNode): {
  [key: string]: boolean;
} {
  const fields = selectionSet.selections;
  const relations = fields.filter(
    (field) => field.kind === Kind.FIELD && field.selectionSet !== undefined
  ) as FieldNode[];

  // Recurse through selection set to find all relations
  const includeOptions = relations.reduce((acc, relation) => {
    const relationName = relation.name.value;
    acc[relationName] = true;
    // Check if relation has subrelations

    const selectionSet = relation.selectionSet;
    if (selectionSet && selectionSet.selections.length > 0) {
      const relations = selectionSet.selections.filter(
        (selection) =>
          selection.kind === Kind.FIELD && selection.selectionSet !== undefined
      ) as FieldNode[];
      if (relations.length > 0) {
        acc[relationName] = { include: generateInclude(selectionSet) };
      }
    }

    return acc;
  }, {});

  // Check if include options are empty
  if (Object.keys(includeOptions).length === 0) {
    return undefined;
  }
  return includeOptions;
}
