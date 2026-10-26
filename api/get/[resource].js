// /api/get/<resource>
import { createRouter } from "../_lib/router.js";
import blogs from "../_lib/public/blogs.js";
import songs from "../_lib/public/songs.js";
import soundDesigns from "../_lib/public/sound-designs.js";

export default createRouter({
  blogs,
  songs,
  "sound-designs": soundDesigns,
});
