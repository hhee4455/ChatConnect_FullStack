import Link from "next/link";
import "./globals.css";
import connectDB from "../../db";

export const metadata = {
  title: "Web tutorials",
  description: "Generated by LSJ",
};

export default async function RootLayout({ children }) {
  const resp = await fetch("http://localhost:9999/topics");
  //connectDB();
  const topics = await resp.json();
  return (
    <html>
      <body>
        <h1>
          <Link href="/">WEB</Link>
        </h1>
        <ol>
          {topics.map((topic) => {
            return (
              <li key={topic.id}>
                <Link href={`/read/${topic.id}`}>{topic.title}</Link>
              </li>
            );
          })}
        </ol>
        {children}
        <ul>
          <li>
            <Link href="/create">Create</Link>
          </li>
          <li>
            <Link href="/update">Update</Link>
          </li>
          <li>
            <input type="button" value="delete"></input>
          </li>
        </ul>
      </body>
    </html>
  );
}
