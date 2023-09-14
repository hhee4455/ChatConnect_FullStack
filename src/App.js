import logo from "./logo.svg";
import "./App.css";
import { useState } from "react"; //state 함수

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            // 경고창 나오게 하는 부분
            event.preventDefault();
            props.onChangeMode(Number(event.target.id)); //id 값이 필요하므로 id를 넣어주고 <a></a> 부분에 {t.id}
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  // 컴포넌트
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article(props) {
  //props..?
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  // const _mode = useState("WELCOME");   //state 부분
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState("Welcome"); // 위 세줄 요약한거
  const [id, setid] = useState(null);
  const topics = [
    { id: 1, title: "html", body: "html is ... " },
    { id: 2, title: "css", body: "css is ... " },
    { id: 3, title: "javascript", body: "javascript is ... " },
  ];
  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcom" body="Hello, WEB"></Article>;
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      //html, css, js 클릭시 title,body 출력
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
  }
  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode("READ");
          setid(_id);
          //alert(id); //경고장으로 나오는 부분
        }}
      ></Nav>
      {content}
    </div>
  );
}

export default App;
