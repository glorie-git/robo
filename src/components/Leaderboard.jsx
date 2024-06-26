function Leaderboard({ leaderboard }) {
  return (
    <>
      <h2>Leaderboard</h2>
      {leaderboard ? (
        <ol>
          {leaderboard
            .sort((a, b) => {
              if (parseInt(a[1]) < parseInt(b[1])) {
                return 1;
              } else if (parseInt(a[1]) > parseInt(b[1])) {
                return -1;
              }

              return 0;
            })
            .map((leader) => {
              return (
                <li key={leader}>
                  {leader[0]} {leader[1]}
                </li>
              );
            })}
        </ol>
      ) : null}
    </>
  );
}

export default Leaderboard;
