import { levelingDialog } from "./LevelingDialog";
import { BranchOverviewForm } from "./BranchOverviewForm";

declare const game: Game;

export class MagaambyaStudyHelper {
  static ID = "magaambya-study-helper";

  static FLAGS = {
    BRANCHDATA: "branch-data",
  };

  static SETTINGS = {};

  static TEMPLATES = {
    branchOverview: `modules/${this.ID}/templates/branch-overview.html`,
  };

  static log(force, ...args) {
    const shouldLog =
      force ||
      //      @ts-ignore
      game.modules.get("_dev-mode")?.api?.getPackageDebugValue(this.ID);

    if (shouldLog) {
      console.log(this.ID, "|", ...args);
    }
  }

  static initialize() {
    Hooks.on('getActorSheetHeaderButtons', (sheet, buttons) => {
      buttons.unshift({
        label: 'Magaambya Helper',
        class: 'popout',
        icon: 'fas fa-book',
        onclick: async () => {
          new BranchOverviewForm(sheet.object).render(true);
        },
      })
      return buttons;
    });
    Hooks.on("renderBranchOverviewForm", (app, html, obj) => {
      let actor = app.object;
      const { firstBranchLevel, secondBranchLevel, firstBranch, secondBranch } =
        actor.getFlag(this.ID, this.FLAGS.BRANCHDATA);
      const button = $("#firstBranchButton") as JQuery<HTMLButtonElement>;
      button.on("click", function () {
        levelingDialog(firstBranch, firstBranchLevel, actor);
      });
      const secondbutton = $(
        "#secondBranchButton"
      ) as JQuery<HTMLButtonElement>;
      secondbutton.on("click", function () {
        levelingDialog(secondBranch, secondBranchLevel, actor);
      });
    });
  }
}
