import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Create = () => {
  const router = useRouter();
  useEffect(() => {
    let user = Cookies.get("name");
    var log = false;

    if (typeof user !== "undefined") {
      if (user !== "" || user !== null) {
        log = true;
      }
    }
    if (!user) {
      router.push("/login");
    }
  }, []);
  const [state, setState] = useState({
    title: "",
    content: "",
  });

  let handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  function submitArticle(e) {
    e.preventDefault();
    const formData = {
      auth: Cookies.get("auth"),
      title: state.title,
      content: state.content,
    };

    axios
      .post("/api/article", formData)
      .then((result) => {
        const lengthNid = result.data.nid.length;
        if (lengthNid >= 1) {
          router.push("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div className="container">
      <div className="mt-2 mx-auto">
        <div className="card">
          <div className="card-header text-center">Create New Article</div>
          <div className="card-body">
            <form onSubmit={submitArticle}>
              <div className="form-group">
                <label>Article Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={state.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  className="form-control"
                  name="content"
                  rows="10"
                  value={state.content}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Submit Article
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
