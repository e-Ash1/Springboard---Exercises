"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/******************************************************************************
 * Story: a single story in the system
 ******************************************************************************/

class Story {
  /** 
   * Constructor: Initializes a new instance of a story.
   */
  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  /** 
   * getHostName(): Extract and return the hostname from the story's URL.
   */
  getHostName() {
    let urlObj = new URL(this.url);
    return urlObj.hostname;
  }
}

/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 ******************************************************************************/

class StoryList {
  /** 
   * Constructor: Initializes a new story list from an array of stories.
   */
  constructor(stories) {
    this.stories = stories;
  }

  /** 
   * getStories(): Static method to get stories from the API, convert them to Story instances,
   * and return a new StoryList instance.
   */
  static async getStories() {
    // Query the /stories endpoint
    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "GET",
    });

    // Convert API story objects into Story class instances
    const stories = response.data.stories.map(story => new Story(story));

    // Return a new StoryList instance
    return new StoryList(stories);
  }

  /** 
   * addStory(): Add a new story to the API and subsequently to the story list.
   */
  static async addStory(user, newStory) {
    const response = await axios.post("API_ENDPOINT_FOR_ADDING_STORY", {
      token: user.loginToken,
      story: newStory
    });
    const story = new Story(response.data.story);
    return story;
  }

  static async removeStory(user, storyId) {
    await axios.delete(`API_ENDPOINT_FOR_DELETING_STORY/${storyId}`, {
      data: { token: user.loginToken }
    });
  }
}

/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 ******************************************************************************/

class User {
  /** 
   * Constructor: Initializes a new user instance.
   */
  constructor({ username, name, createdAt, favorites = [], ownStories = [] }, token) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;
    this.favorites = favorites.map(s => new Story(s));
    this.ownStories = ownStories.map(s => new Story(s));
    this.loginToken = token;
  }

  /** 
   * signup(): Register a new user in the API and return a new User instance.
   */
  static async signup(username, password, name) {
    const response = await axios({
      url: `${BASE_URL}/signup`,
      method: "POST",
      data: { user: { username, password, name } },
    });

    let { user } = response.data;

    return new User({
      username: user.username,
      name: user.name,
      createdAt: user.createdAt,
      favorites: user.favorites,
      ownStories: user.stories
    }, response.data.token);
  }

  /** 
   * login(): Log in a user via the API using their credentials and return a new User instance.
   */
  static async login(username, password) {
    const response = await axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: { user: { username, password } },
    });

    let { user } = response.data;

    return new User({
      username: user.username,
      name: user.name,
      createdAt: user.createdAt,
      favorites: user.favorites,
      ownStories: user.stories
    }, response.data.token);
  }

  /** 
   * loginViaStoredCredentials(): Log in a user using stored credentials and return a new User instance.
   */
  static async loginViaStoredCredentials(token, username) {
    try {
      const response = await axios({
        url: `${BASE_URL}/users/${username}`,
        method: "GET",
        params: { token },
      });

      let { user } = response.data;

      return new User({
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      }, token);
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }

  /** 
   * addFavorite(): Add a story to the user's favorites.
   */
  async addFavorite(storyId) {
    const response = await axios({
      url: `${BASE_URL}/users/${this.username}/favorites/${storyId}`,
      method: "POST",
      params: {
        token: this.loginToken
      }
    });

    const newFavoriteStory = new Story(response.data.story);
    this.favorites.push(newFavoriteStory);
    return newFavoriteStory;
  }

  /** 
   * removeFavorite(): Remove a story from the user's favorites.
   */
  async removeFavorite(storyId) {
    const response = await axios({
      url: `${BASE_URL}/users/${this.username}/favorites/${storyId}`,
      method: "DELETE",
      params: {
        token: this.loginToken
      }
    });

    this.favorites = this.favorites.filter(story => story.storyId !== storyId);
    return response.data.message;
  }
}
