import { useRouter } from "next/router";
import React from "react";
import { Item, Image } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";

const Board = ({ test }: any) => {
  console.log(test);
  return (
    <Item.Group>
      <div>test: {test}</div>
      <Item>
        <Item.Image size="tiny" src="/images/wireframe/image.png" />

        <Item.Content>
          <Item.Header as="a">Header</Item.Header>
          <Item.Meta>Description</Item.Meta>
          <Item.Description>
            <p>This is the content</p>
          </Item.Description>
          <Item.Extra>Additional Details</Item.Extra>
        </Item.Content>
      </Item>

      <Item>
        <Item.Image size="tiny" src="/images/wireframe/image.png" />

        <Item.Content>
          <Item.Header as="a">Header</Item.Header>
          <Item.Meta>Description</Item.Meta>
          <Item.Description>
            <p>This is more content</p>
          </Item.Description>
          <Item.Extra>Additional Details</Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export async function getServerSideProps({ query }: any) {
  const bid = query.boardId;
  return { props: { test: bid } };
}

export default Board;
