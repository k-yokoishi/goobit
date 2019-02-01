import React from "react";
import { storiesOf, addDecorator } from "@storybook/react-native";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { withNotes } from "@storybook/addon-ondevice-notes";
import Home from "../../component/Home";

addDecorator(withNotes);

const stories = storiesOf("Home", module);
stories.addDecorator(withKnobs);
stories
  .add(
    "with habits",
    () => (
      <Home
        goal={text("Goal", "56キロになる")}
        date={new Date().toDateString()}
        habits={[
          { id: "1b8rja", habit: "腹筋を100回やる", done: boolean("habit1", false) },
          { id: "gz0bea", habit: "腹筋を100回やる", done: boolean("habit2", true) },
          { id: "pob5kz", habit: "スクワットを100回やる", done: boolean("habit3", false) }
        ]}
        check={console.log}
      />
    ),
    { notes: "Initial page" }
  )
  .add("without habit", () => <Home goal="56キロになる" date={new Date().toDateString()} habits={[]} />);
