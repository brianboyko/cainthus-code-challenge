import actionTypes, { createActionTypes } from "./reduxTypes";
describe("./src/store/reduxTypes.ts", () => {
  describe("actionTypes", () => {
    it("creates the proper action types", () => {
      expect(actionTypes).toEqual({
        photos: {
          LOAD_PHOTOS: "photos.LOAD_PHOTOS",
          SET_LOADING: "photos.SET_LOADING"
        }
      });
    });
  });
  describe("createActionTypes", () => {
    it("creates namespaced actionTypes", () => {
      const shouldBe = {
        EIGHT_OUT_OF_TEN_CATS: "panelshows.EIGHT_OUT_OF_TEN_CATS",
        HAVE_I_GOT_NEWS_FOR_YOU: "panelshows.HAVE_I_GOT_NEWS_FOR_YOU",
        MOCK_THE_WEEK: "panelshows.MOCK_THE_WEEK",
        QI: "panelshows.QI",
        WOULD_I_LIE_TO_YOU: "panelshows.WOULD_I_LIE_TO_YOU"
      };
      const panelshows = createActionTypes(
        "panelshows",
        "MOCK_THE_WEEK",
        "HAVE_I_GOT_NEWS_FOR_YOU",
        "QI",
        "EIGHT_OUT_OF_TEN_CATS",
        "WOULD_I_LIE_TO_YOU"
      );
      const scifi = createActionTypes(
        "scifi",
        "DOCTOR_WHO",
        "RED_DWARF",
        "BLAKES_SEVEN"
      );
      expect(panelshows).toEqual(shouldBe);
      expect(panelshows.DOCTOR_WHO).toBeUndefined();
      expect(panelshows.HAVE_I_GOT_TYPO_FOR_YOU).toBeUndefined();
      expect(scifi.DOCTOR_WHO).toBe("scifi.DOCTOR_WHO");
      expect(scifi.QI).toBeUndefined();
    });
  });
});
