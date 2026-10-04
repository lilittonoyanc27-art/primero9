export interface TheoryExample {
  es: string;
  hy: string;
  subEs?: string;
  subHy?: string;
}

export interface TheorySection {
  id: number;
  titleEs: string;
  titleHy: string;
  tag: string;
  explanationEs: string;
  explanationHy: string;
  examples: TheoryExample[];
  noteEs?: string;
  noteHy?: string;
  comparison?: {
    item1Es: string;
    desc1Es: string;
    item1Hy: string;
    desc1Hy: string;
    item2Es: string;
    desc2Es: string;
    item2Hy: string;
    desc2Hy: string;
  };
}

export interface ExerciseItem {
  id: number;
  part: number;
  partTitleEs: string;
  partTitleHy: string;
  questionEs: string;
  questionHy?: string;
  options?: Array<{ key: string; textEs: string; textHy?: string }>;
  answer: string;
  explanationEs?: string;
  explanationHy?: string;
  hintEs?: string;
  hintHy?: string;
}

export interface TextQuestion {
  id: number;
  questionEs: string;
  questionHy?: string;
  answerEs: string;
  answerHy?: string;
}

export interface ExamText {
  id: number;
  titleEs: string;
  titleHy: string;
  textEs: string[];
  textHy: string[];
  questions: TextQuestion[];
}
