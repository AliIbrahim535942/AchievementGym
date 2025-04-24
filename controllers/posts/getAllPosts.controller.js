import Post from "../../models/post.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getAllPosts(req, res, next) {
  const { PageNumber = 0 } = req.query;
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "Coachs",
          localField: "coachId",
          foreignField: "coachId",
          as: "Coach",
        },
      },
      { $unwind: "$Coach" },
      { $sort: { date: -1 } },
      {
        $project: {
          content: 1,
          imageUrl: 1,
          coachId: 1,
          date: 1,
          "Coach.firstName": 1,
          "Coach.lastName": 1,
          "Coach.imageUrl": 1,
        },
      },
      { $skip: Number(PageNumber) * 10 },
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
