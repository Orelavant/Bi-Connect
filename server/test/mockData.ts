const user1 = {
	username: "foo",
	email: "foo@haverford.edu",
	password: "123456",
};

const user2 = {
	username: "bar",
	email: "bar@haverford.edu",
	password: "123456",
};

const user3 = {
	username: "baz",
	email: "baz@brynmawr.edu",
	password: "123456",
};

const board1 = {
	name: "hc-2018",
	description: "haverford 2018",
};

const board2 = {
	name: "hc-2019",
	description: "haverford 2019",
};

const board3 = {
	name: "bmc-2020",
	description: "brynmawr 2020",
};

const post1 = {
	title: "some title",
	content: "post content",
	boardName: "hc-2018",
};

const post2 = {
	title: "some other title",
	content: "some other post content",
	boardName: "hc-2019",
};

const post3 = {
	title: "some other other title",
	content: " some other other post content",
	boardName: "bmc-2020",
};

const comment1 = {
	content: "some comment",
};

const comment2 = {
	content: "some other content",
};

const comment3 = {
	content: "some other other content",
};

export const users = [user1, user2, user3];

export const boards = [board1, board2, board3];

export const posts = [post1, post2, post3];

export const comments = [comment1, comment2, comment3];
