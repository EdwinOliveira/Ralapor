import { useSelector } from "react-redux";
import type { RootState } from "../state/useStore";

const useUserSelector = () => useSelector((state: RootState) => state.user);

export { useUserSelector };
