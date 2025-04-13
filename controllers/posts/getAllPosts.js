import Post from "../../models/post.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getAllPosts(req, res, next) {
  const { PageNumber } = req.query;
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "coachs",
          localField: "coachId",
          foreignField: "coachId",
          as: "coach",
        },
      },
      { $unwind: "$coach" },
      { $sort: { date: -1 } },
      {
        $project: {
          content: 1,
          imageUrl: 1,
          coachId: 1,
          date: 1,
          "coach.firstName": 1,
          "coach.lastName": 1,
          "coach.imageUrl": 1,
        },
      },
      { $skip: PageNumber * 10 },
      { $limit: 10 },
    ]);
    return responseHandler.success(res, "The posts fetched successfully ", {
      posts: posts,
    });
  } catch (error) {
    return responseHandler.error(res, "server error", 500, {
      error: error.message,
    });
  }
}
export default getAllPosts;
