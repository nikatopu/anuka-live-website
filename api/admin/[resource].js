// /api/admin/<resource>
import { createRouter } from "../_lib/router.js";
import login from "../_lib/admin/login.js";
import logout from "../_lib/admin/logout.js";
import session from "../_lib/admin/session.js";
import password from "../_lib/admin/password.js";
import uploadSignature from "../_lib/admin/upload-signature.js";
import blogs from "../_lib/admin/blogs.js";
import songs from "../_lib/admin/songs.js";
import soundDesigns from "../_lib/admin/sound-designs.js";

export default createRouter({
  login,
  logout,
  session,
  password,
  "upload-signature": uploadSignature,
  blogs,
  songs,
  "sound-designs": soundDesigns,
});
