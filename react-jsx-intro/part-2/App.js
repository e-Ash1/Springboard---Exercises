function App() {
    return (
      <div>
        <Tweet
          name="Louis Lane"
          username="TheRealLane"
          date={new Date().toDateString()}
          message="Hmmmmmm mmmmkayy BYEEEEEE!!"
        />
        <Tweet
          name="Clark Kent"
          username="NotSuperMan"
          date={new Date().toDateString()}
          message="Lightnin strikes twice"
        />
        <Tweet
          name="Garfield"
          username="Lasagna801"
          date={new Date().toDateString()}
          message="Which place got the best pasta in town?"
        />
      </div>
    );
  }