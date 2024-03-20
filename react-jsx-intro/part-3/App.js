function App() {
    return (
      <div>
        <Person
          name="Barry"
          age={26}
          hobbies={["Running", "Hydrating", "Saving the World"]}
        />
        <Person name="Superman" age={34} hobbies={["Journalism", "Farming"]} />
        <Person
          name="Bart"
          age={10}
          hobbies={["Flying", "Fighting Bad Guys"]}
        />
        <Person
          name="Lady Gaga"
          age={32}
          hobbies={["Singing", "Romancing", "Vibing"]}
        />
      </div>
    );
  }