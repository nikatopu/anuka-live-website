// /api/admin/<resource>/<id>
import { createRouter } from "../../_lib/router.js";
import blogs from "../../_lib/admin/items/blogs.js";
import songs from "../../_lib/admin/items/songs.js";
import soundDesigns from "../../_lib/admin/items/sound-designs.js";

export default createRouter({
  blogs,
  songs,
  "sound-designs": soundDesigns,
});
