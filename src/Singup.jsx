import axios, { Axios } from "axios";
import Header from "./components/header";
import { useState } from "react";
export default function Singup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [repeatpassword, setrepeatpassword] = useState("");
  const [accept, setaccept] = useState(false);
  const [emailerror, setemailerror] = useState(false);

  async function submit(e) {
    let falg = true;
    console.log(falg);
    e.preventDefault();
    setaccept(true);
    if (name === "" || password.length < 8 || repeatpassword !== password) {
      falg = false;
    } else falg = true;
    console.log(falg);
    try {
      if (falg) {
        let res = await axios.post("http://127.0.0.1:8888/api/register", {
          name: name,
          email: email,
          password: password,
          password_confirmation: repeatpassword,
        });
        if (res.status === 200) {
          window.localStorage.setItem("email", email);
          window.location.pathname = "/";
        }
      }
    } catch (err) {
      setemailerror(err.response.status);
    }
  }
  return (
    <div>
      <Header />
      <div className="w-[450px]" style={{margin: '1px auto'}}>
        <form
          onSubmit={submit}
          action=""
          className="flex flex-col w-full mt-10 shadow-md p-3"
        >
          <label htmlFor="name" className="mb-2">
            Name
          </label>
          <input
            type="text"
            className=" bg-slate-200 text-zinc-950 rounded p-1 outline-none"
            name="name"
            id="name"
            placeholder="name..."
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          {name.length == "" && accept && (
            <p className="text-red-400">Username is required</p>
          )}
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <input
            type="email"
            className=" bg-slate-200 text-zinc-950 rounded p-1 outline-none"
            name="email"
            id="email"
            placeholder="email..."
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          {accept && emailerror === 422 && (
            <p className="text-red-400">Email is already neen taken</p>
          )}
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            type="password"
            className=" bg-slate-200 text-zinc-950 rounded p-1 outline-none"
            name="password"
            id="password"
            placeholder="passwoed"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          {password.length < 8 && accept && (
            <p className="text-red-400">password must be more than 8 char</p>
          )}
          <label className="mb-2" htmlFor="repeatpassword">
            Repeat Password
          </label>
          <input
            type="password"
            name="repeatpassword"
            id="repeatpassword"
            placeholder="Repeat Password..."
            className=" bg-slate-200 text-zinc-950 rounded p-1 outline-none"
            value={repeatpassword}
            onChange={(e) => setrepeatpassword(e.target.value)}
          />
          {repeatpassword !== password && accept && (
            <p className="text-red-400">
              Repeatpassword must to be lick passwoed
            </p>
          )}
          <div className="flex justify-center">
            <button type="submit" className="hav-bu mt-4">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
