/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Design' | 'Tools';
  rating: number; // percentage (e.g. 90)
  experienceYears: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  image: string; // fallback generator or pattern
  tags: string[];
  demoUrl: string;
  codeUrl: string;
  features: string[];
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: 'award' | 'certification' | 'publication';
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
  rating: number;
}

export interface Profile {
  id: string;
  name: string;
  nickname: string;
  title: string;
  titleSerifHighlight: string;
  subtitle: string;
  description: string;
  yearsOfExperience: number;
  completedProjects: number;
  clientsServed: number;
  masteredTechs: number;
  resumeUrl: string;
  profilePicUrl: string;
}
