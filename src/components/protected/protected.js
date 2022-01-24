import "./protected.css";

export default function Protected({ loggedinUser }) {
  return (
    <div>
      <h1>Protected page </h1>
      {loggedinUser && (
        <div className="profile">
          <img
            src={loggedinUser.photo}
            alt="user"
            style={{ maxHeight: "200px" }}
          />
          <div className="profile-info">
            <h3>Profile of {loggedinUser.name}</h3>
            <h4>Email</h4>
            <p>{loggedinUser.email}</p>
            <h4>Password</h4>
            <p>{loggedinUser.password}</p>
          </div>
        </div>
      )}
    </div>
  );
}
