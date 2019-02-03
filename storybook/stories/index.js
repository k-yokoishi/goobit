import React from "react";
import { storiesOf, addDecorator } from "@storybook/react-native";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { withNotes } from "@storybook/addon-ondevice-notes";
import moment from "moment";
import Home from "../../component/Home";
import Goal from "../../component/Goal";
import GoalSetting from "../../component/GoalSetting";

addDecorator(withNotes);

const now = moment();
const afterThreeMonth = now.add(3, "months");

const homeStories = storiesOf("Home", module);
homeStories.addDecorator(withKnobs);
homeStories
  .add(
    "with habits",
    () => (
      <Home
        goals={[text("Goal 1", "56キロになる"), text("Goal 2", "54キロになる")]}
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
  .add("without habit", () => <Home goals={[text("Goal 1", "56キロになる")]} habits={[]} />);

const goalStories = storiesOf("Goal", module);
goalStories
  .add("does not hove goal", () => <Goal goals={[]} />)
  .add("has 2 goals", () => (
    <Goal goals={[{ id: "dfqb5l", text: "56キロになる" }, { id: "oir90b", text: "54キロになる" }]} />
  ));

const goalSettingStories = storiesOf("Goal Setting", module);
goalSettingStories.add("Goal Setting", () => <GoalSetting />);
