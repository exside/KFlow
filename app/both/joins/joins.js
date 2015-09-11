// Projects
Projects.join(Users, "owner", "ownerobj", []);

// Sequences
Sequences.join(Users, "user", "userobj", []);
Sequences.join(Evaluations, "evaluation", "evaluationobj", []);

// Tasks
Tasks.join(Domains, "domains", "domainobjs", []);
Tasks.join(Evaluations, "evaluation", "evaluationobj", []);

// Domainknowledges
Domainknowledges.join(Projects, "project", "projectobj", []);
Domainknowledges.join(Users, "user", "userobj", []);

