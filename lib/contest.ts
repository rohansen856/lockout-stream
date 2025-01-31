import axios from "axios"

interface ContestProblemPair {
  contest_id: string
  problem_id: string
}

type Problem = {
  id: string
  contest_id: string
  title: string
}

export const getContestProblems = async (
  contestId: string
): Promise<Problem[]> => {
  try {
    // Fetch the contest-problem pairs
    const contestProblemPairsUrl =
      "https://kenkoooo.com/atcoder/resources/contest-problem.json"
    const contestProblemPairsResponse = await axios.get<ContestProblemPair[]>(
      contestProblemPairsUrl
    )
    const contestProblemPairs = contestProblemPairsResponse.data

    // Extract problem IDs for the given contest ID
    const problemIds = contestProblemPairs
      .filter((pair) => pair.contest_id === contestId)
      .map((pair) => pair.problem_id)

    // Fetch detailed problem information
    const problemsUrl =
      "https://kenkoooo.com/atcoder/resources/merged-problems.json"
    const problemsResponse = await axios.get<Problem[]>(problemsUrl)
    const allProblems = problemsResponse.data

    // Filter problems that match the extracted problem IDs
    const contestProblems = allProblems.filter((problem) =>
      problemIds.includes(problem.id)
    )

    return contestProblems
  } catch (error) {
    console.error("Error fetching contest problems:", error)
    return []
  }
}
