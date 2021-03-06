import { User } from "../../../src/user/interfaces/user.interface";

export const userMockup: User = {
  pseudo: "_test_",
  password: "_test_",
  email: "test@gmail.com",
  profileImageUrl: "img.png",
};

export const userAuthMockup: User = {
  pseudo: "_test_auth_",
  password: "_test_",
  email: "test.auth@gmail.com",
  profileImageUrl: "img.png",
};

export const userBookcaseMockup: User = {
  pseudo: "_test_bk_",
  password: "_test_",
  email: "test.bk@gmail.com",
  profileImageUrl: "img.png",
};

export const usersMockup: User[] = [
  {
    pseudo: "test",
    password: "test",
    email: "test@test.com",
    profileImageUrl:
      "https://gravatar.com/avatar/ac9817e8902d2ada96c18f6fa4b395db?s=152&d=retro",
    comments: [{ rating: 5, message: "Really good user!" }],
  },
  {
    pseudo: "azerty",
    password: "azerty",
    email: "azerty@azerty.com",
    profileImageUrl:
      "https://gravatar.com/avatar/7625df5548e8e76106d35b68d81f403b?s=152&d=retro",
    comments: [{ rating: 4.5, message: "Thank u Azerty!" }],
  },
];
