import axios from "axios";

export class fetchPost {
  static async getAll(link) {
    try {
      const response = await axios.get(link);
      return response.data;
    } catch (error) {
      console.log(error)
    }

  }
}
