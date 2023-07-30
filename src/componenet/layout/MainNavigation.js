import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}> Tax Calculator</div>
    </header>
  );
};

export default MainNavigation;
