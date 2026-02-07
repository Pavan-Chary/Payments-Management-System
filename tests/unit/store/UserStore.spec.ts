import store from "@/store"; // Adjust path based on your project structure
import type User from "@/components/models/User";

describe("Vuex Store - User Operations", () => {
  
  it("should return the initial list of users", () => {

    const users = store.getters.getUsers;

    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBe(4);
    expect(users[0].name).toBe("Anvitha Rao");
  });

  it("should add a new user to the state", () => {

    const newUser: User = {
      userId: 0, 
      name: "User",
      email: "user@gmail.com",
      isActive: true,
    };
    const initialCount = store.getters.getUsers.length;

    store.commit("addUser", newUser);

    const users = store.getters.getUsers;

    expect(users.length).toBe(initialCount + 1);
    expect(users[users.length - 1].name).toBe("User");
    expect(users[users.length - 1].userId).toBe(120); 

  });

  it("should throw an error if adding a user with a duplicate email", () => {
    
    //user with this email = anvitha.rao@hydmail.in already exists
    const duplicateUser: User = {
      userId: 0,
      name: "Duplicate User",
      email: "anvitha.rao@hydmail.in", 
      isActive: true,
    };

    expect(() => {
      store.commit("addUser", duplicateUser);
    }).toThrow("User Already exists");

  });
});