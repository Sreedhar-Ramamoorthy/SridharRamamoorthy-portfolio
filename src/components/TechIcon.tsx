import type { IconType } from "react-icons";
import { FaAws, FaDatabase, FaJava, FaMicrosoft, FaProjectDiagram, FaServer, FaSyncAlt, FaVial } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import {
  SiApachemaven, SiBitbucket, SiDocker, SiElastic, SiGit, SiGrafana, SiHibernate, SiJenkins,
  SiJunit5, SiKeycloak, SiKubernetes, SiLinux, SiMongodb, SiMysql, SiPostgresql, SiPrometheus,
  SiPython, SiRedis, SiSnowflake, SiSpringboot, SiSpringsecurity,
} from "react-icons/si";
import type { SkillIcon } from "@/data/portfolio";

const icons: Record<SkillIcon, { Icon: IconType; color: string }> = {
  java: { Icon: FaJava, color: "#f89820" },
  python: { Icon: SiPython, color: "#3776ab" },
  spring: { Icon: SiSpringboot, color: "#6db33f" },
  springsecurity: { Icon: SiSpringsecurity, color: "#6db33f" },
  hibernate: { Icon: SiHibernate, color: "#bcae79" },
  api: { Icon: TbApi, color: "#8b5cf6" },
  server: { Icon: FaServer, color: "#0ea5e9" },
  database: { Icon: FaDatabase, color: "#b91c1c" },
  mysql: { Icon: SiMysql, color: "#4479a1" },
  postgres: { Icon: SiPostgresql, color: "#4169e1" },
  mongodb: { Icon: SiMongodb, color: "#47a248" },
  redis: { Icon: SiRedis, color: "#dc382d" },
  snowflake: { Icon: SiSnowflake, color: "#29b5e8" },
  docker: { Icon: SiDocker, color: "#2496ed" },
  kubernetes: { Icon: SiKubernetes, color: "#326ce5" },
  jenkins: { Icon: SiJenkins, color: "#d24939" },
  cicd: { Icon: FaSyncAlt, color: "#14b8a6" },
  aws: { Icon: FaAws, color: "#ff9900" },
  azure: { Icon: FaMicrosoft, color: "#0078d4" },
  junit: { Icon: SiJunit5, color: "#25a162" },
  test: { Icon: FaVial, color: "#84cc16" },
  elastic: { Icon: SiElastic, color: "#00bfb3" },
  prometheus: { Icon: SiPrometheus, color: "#e6522c" },
  grafana: { Icon: SiGrafana, color: "#f46800" },
  git: { Icon: SiGit, color: "#f05032" },
  bitbucket: { Icon: SiBitbucket, color: "#0052cc" },
  maven: { Icon: SiApachemaven, color: "#c71a36" },
  linux: { Icon: SiLinux, color: "#a3a3a3" },
  keycloak: { Icon: SiKeycloak, color: "#4d4dff" },
  pattern: { Icon: FaProjectDiagram, color: "#a855f7" },
};

export default function TechIcon({ name, size = 18 }: { name: SkillIcon; size?: number }) {
  const { Icon, color } = icons[name];
  return <Icon size={size} style={{ color }} aria-hidden />;
}
