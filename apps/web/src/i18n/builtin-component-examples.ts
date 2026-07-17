const EXAMPLES: Record<string, string> = {
  MpProfile: `<MpProfile mpId="MzIxNjA5ODQ0OQ==" nickname="Doocs" headimg="https://cdn-doocs.oss-cn-shenzhen.aliyuncs.com/gh/doocs/md/images/mp-logo.png" signature="GitHub 开源组织" serviceType="1" verifyStatus="1" />`,
  QRCodeBlock: `<QRCodeBlock url="https://github.com/doocs/md" text="扫码访问" size="150" />`,
  AuthorBlock: `<AuthorBlock name="yanglbme" avatar="https://avatars.githubusercontent.com/u/21008209?v=4" bio="Doocs 创建者" />`,
  TipBlock: `<TipBlock type="info" title="提示" content="这是一条提示信息" />`,
  TableBlock: `<TableBlock headers='["名称","版本","状态"]' rows='[["Vue","3.x","稳定"],["Vite","8.x","稳定"],["pnpm","10.x","稳定"]]' caption="技术栈清单" />`,
  InfoGrid: `<InfoGrid items='[{"label":"作者","value":"yanglbme"},{"label":"版本","value":"v1.0"},{"label":"许可证","value":"MIT"},{"label":"语言","value":"TypeScript"}]' cols="2" />`,
  BadgeGroup: `<BadgeGroup tags='["Vue 3","TypeScript","Vite","Tailwind CSS"]' color="#07c160" />`,
}

export function getBuiltinComponentExample(_locale: unknown, name: string, fallback?: string): string | undefined {
  return EXAMPLES[name] ?? fallback
}
