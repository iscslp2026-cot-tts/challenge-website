# ISCSLP 2026 Challenge Website Design Plan

## 1. Challenge Website Goal

This website is designed for the **ISCSLP 2026 Challenge on Context-Aware Reasoning Text-to-Speech**. It should serve as the official entry point for participants, reviewers, and organizers.

The site should not only introduce the challenge, but also support the full competition workflow:

- Reading the task description, rules, timeline, evaluation protocol, and FAQ.
- Registering teams and selecting competition tracks.
- Downloading data, baseline models, starter kits, and evaluation scripts.
- Submitting trained systems through a model-submission portal.
- Tracking submission status and evaluation progress.
- Displaying four public leaderboards.
- Providing organizer-side tools for validation, scoring, announcements, and result moderation.

The design follows common competition platforms such as Kaggle, EvalAI, CodaLab/Codabench, and DrivenData: a clear overview page, separate tabs for data and rules, a guided submission workflow, public/private leaderboard logic, and an organizer dashboard for challenge management.

Reference examples:

- EvalAI challenge pages: https://eval.ai/
- EvalAI challenge configuration: https://evalai.readthedocs.io/en/latest/configuration.html
- CodaLab/Codabench leaderboard design: https://github.com/codalab/codalab-competitions/wiki/Organizer_Leaderboard
- DrivenData competition pages: https://www.drivendata.org/competitions/
- Kaggle competitions: https://www.kaggle.com/competitions

## 2. Recommended Site Structure

The website can be organized as a single challenge portal with top navigation tabs.

Suggested top navigation:

- **Overview**
- **Tasks**
- **Data & Models**
- **Submission**
- **Leaderboards**
- **Rules**
- **Timeline**
- **Papers**
- **FAQ**
- **Contact**

For logged-in participants, the navigation should additionally show:

- **My Team**
- **My Submissions**
- **Submission Status**

For organizers, the navigation should additionally show:

- **Admin Dashboard**
- **Submission Review**
- **Evaluation Jobs**
- **Announcement Manager**
- **Leaderboard Manager**

## 3. Homepage / Overview Page

The homepage should immediately communicate what the challenge is, who it is for, and how to participate.

### 3.1 Hero Section

Content:

- Challenge title: **ISCSLP 2026 Challenge on Context-Aware Reasoning Text-to-Speech**
- Short subtitle: **Reasoning from dialogue context to generate expressive, speaker-consistent speech**
- Conference badge: **ISCSLP 2026 Challenge**
- Key dates: launch, submission deadline, evaluation period, final ranking announcement.
- Primary action buttons:
  - **Register / Join Challenge**
  - **Download Data**
  - **Submit Model**
  - **View Leaderboards**

Example intro text:

> This challenge evaluates whether a TTS system can infer the intended speaking manner from textual or acoustic dialogue context, produce an explicit reasoning-style analysis, and generate speech that is natural, speaker-consistent, and contextually appropriate.

### 3.2 Quick Facts Cards

Display compact cards:

- **Task**: Context-aware reasoning TTS.
- **Tracks**: Text-context and audio-context.
- **Categories**: Unrestricted and small-model `<1B`.
- **Languages**: Chinese and English.
- **Training Data**: Around 3M segments / 16K hours.
- **Evaluation Set**: 600 Chinese and 600 English hidden samples.
- **Submission Type**: Model, inference code, environment, and system description.
- **Final Score**: Objective 30%, LLM-based 20%, human subjective 50%.

### 3.3 Challenge Motivation

Explain the problem in participant-friendly language:

- Most controllable TTS systems depend on explicit user-written style prompts.
- In real film dubbing, audiobook, virtual character, and dialogue-agent scenarios, style should be inferred from context.
- The challenge asks systems to reason about emotion, intention, tone, rhythm, and scene dynamics before generating speech.
- Both the reasoning output and generated audio are evaluated.

### 3.4 Participation Flow

Show a four-step visual flow:

1. Register a team and accept the data license.
2. Download training data, baseline, and starter kit.
3. Train an end-to-end context-aware reasoning TTS system.
4. Submit model package and track performance on the leaderboard.

## 4. Task Pages

The **Tasks** page should explain the challenge setup clearly enough for a new team to start.

### 4.1 Track 1: Text-Context-Aware Reasoning TTS

Input:

- Speaker-labeled dialogue history.
- Target text.
- Reference speech sample for target speaker timbre.

Required output:

- Reasoning-style analysis of how the target sentence should be spoken.
- Generated speech waveform.

Example input:

```json
{
  "context": [
    "speaker-0: I cannot believe this happened.",
    "speaker-1: We have no time left."
  ],
  "target_text": "Then we must act now.",
  "reference_audio": "ref_speaker.wav"
}
```

Example output:

```json
{
  "reasoning": "The sentence should be spoken with urgency and restrained tension, because the previous turns indicate a sudden crisis.",
  "output_audio": "generated.wav"
}
```

### 4.2 Track 2: Audio-Context-Aware Reasoning TTS

Input:

- Continuous multi-speaker audio context.
- Target text.
- Reference speech sample for target speaker timbre.

Required output:

- Reasoning-style analysis.
- Generated speech waveform.

Example input:

```json
{
  "context_audio": "history_dialogue.wav",
  "target_text": "Then we must act now.",
  "reference_audio": "ref_speaker.wav"
}
```

Example output:

```json
{
  "reasoning": "The target speaker should sound decisive and tense, continuing the emotionally urgent audio context.",
  "output_audio": "generated.wav"
}
```

### 4.3 Model Categories

Each track has two categories:

- **Unrestricted**: Any model size is allowed, subject to rule compliance.
- **Small Model `<1B`**: Total trainable/inference model parameters must be fewer than 1 billion.

The website should show category-specific registration and submission controls so participants do not accidentally submit to the wrong leaderboard.

## 5. Data & Models Page

The **Data & Models** page should centralize every downloadable or linkable resource.

### 5.1 Dataset Section

Placeholder links to be replaced later:

- Training dataset: `https://example.com/iscslp2026-cot-tts/train`
- Development set: `https://example.com/iscslp2026-cot-tts/dev`
- Metadata files: `https://example.com/iscslp2026-cot-tts/metadata`
- Evaluation sample format: `https://example.com/iscslp2026-cot-tts/eval-format`
- Data license: `https://example.com/iscslp2026-cot-tts/license`

Suggested resource cards:

- **Training Audio Segments**
- **Continuous Context Audio**
- **Text Metadata**
- **Reference Audio**
- **Reasoning Annotations**
- **Starter Evaluation Samples**
- **Data License and Usage Terms**

### 5.2 Baseline Model Section

Placeholder links:

- Baseline model checkpoint: `https://example.com/iscslp2026-cot-tts/baseline-model`
- Baseline inference code: `https://github.com/example/iscslp2026-cot-tts-baseline`
- Docker image: `docker pull example/iscslp2026-cot-tts-baseline:latest`
- Baseline paper/system description: `https://example.com/iscslp2026-cot-tts/baseline-description`

Suggested content:

- Baseline based on a 0.6B Qwen3-style model.
- Three-stage training pipeline: modality alignment, COT-TTS training, high-quality fine-tuning.
- Supports both text-context and audio-context settings.
- Intended as a reproducible starting point, not as an official performance target.

### 5.3 Starter Kit Section

The starter kit should include:

- Data loader examples.
- Input/output schema examples.
- Model package template.
- Submission manifest template.
- Local validation script.
- Example Dockerfile.
- Example `run_inference.sh`.
- Example generated output directory.

Suggested starter-kit link:

`https://github.com/example/iscslp2026-cot-tts-starter-kit`

### 5.4 Data Access Control

Recommended behavior:

- Public users can read dataset descriptions.
- Registered users can download sample data.
- Approved teams that accepted the license can access full training data.
- Hidden test data should never be downloadable.
- Evaluation samples should be mounted inside the official evaluation environment.

## 6. Submission Page

The **Submission** page is the core functional page. It should provide a guided model-submission window rather than a simple upload button.

### 6.1 Submission Window Layout

Recommended sections:

- **Track Selector**
- **Category Selector**
- **Submission Package Upload**
- **Model Metadata Form**
- **External Resource Declaration**
- **Local Validation Checklist**
- **Final Confirmation**
- **Submission History**

### 6.2 Track and Category Selector

Participants must select exactly one leaderboard target:

- Track 1 Text Context / Unrestricted
- Track 1 Text Context / Small Model `<1B`
- Track 2 Audio Context / Unrestricted
- Track 2 Audio Context / Small Model `<1B`

The page should show a warning if a team attempts to submit to a small-model leaderboard while declaring model size `>=1B`.

### 6.3 Submission Package Requirements

Each model submission should include:

- Inference code.
- Runtime environment.
- Trained model or model checkpoints.
- System description document.
- Dependency file or Dockerfile.
- Submission manifest.
- Optional precomputed resources needed for inference.

Recommended archive format:

```text
submission.zip
|-- manifest.json
|-- README.md
|-- system_description.pdf
|-- Dockerfile
|-- requirements.txt
|-- run_inference.sh
|-- src/
|-- checkpoints/
`-- resources/
```

### 6.4 Manifest Format

```json
{
  "team_name": "Example Team",
  "track": "track1_text_context",
  "category": "small_model",
  "model_name": "Example-COT-TTS-0.6B",
  "parameter_count": 600000000,
  "uses_external_data": false,
  "external_data_description": "",
  "uses_pretrained_models": true,
  "pretrained_model_description": "Qwen-style language model and neural codec pretrained on public data.",
  "inference_command": "bash run_inference.sh --input_dir /data/eval --output_dir /output",
  "expected_output_format": "jsonl_and_wav",
  "contact_email": "team@example.com"
}
```

### 6.5 Expected Inference Output

The official evaluator should expect:

```text
output/
|-- predictions.jsonl
`-- wavs/
    |-- sample_000001.wav
    |-- sample_000002.wav
    `-- ...
```

Example `predictions.jsonl` line:

```json
{
  "sample_id": "sample_000001",
  "reasoning": "The speaker should sound tense but controlled because the dialogue context shows an urgent decision.",
  "audio_path": "wavs/sample_000001.wav"
}
```

### 6.6 Submission Validation

Before accepting a submission, the website should run automatic checks:

- Archive size within limit.
- Required files exist.
- `manifest.json` is valid.
- Docker image or environment can be built.
- Inference command exits successfully on a small smoke-test set.
- Output JSONL is parseable.
- Every sample has one reasoning string and one audio file.
- Audio format is valid, for example mono WAV, target sample rate, no clipping.
- Runtime does not exceed smoke-test threshold.
- Declared track/category matches output behavior.

### 6.7 Submission Limits

Recommended limits:

- Maximum 3 successful submissions per team per day.
- Maximum 1 active evaluation job per team.
- Teams can choose one public leaderboard submission per track/category.
- Final submission selection closes at the model submission deadline.

### 6.8 Submission Status Page

Each submission should show:

- Submission ID.
- Track and category.
- Upload time.
- Validation status.
- Evaluation status.
- Error logs for failed validation.
- Public leaderboard visibility.
- Objective score when available.
- Final official score when released.

Suggested statuses:

- `Uploaded`
- `Validating`
- `Validation Failed`
- `Queued`
- `Running Objective Evaluation`
- `Waiting for LLM Evaluation`
- `Waiting for Human Evaluation`
- `Completed`
- `Rejected`
- `Withdrawn`

## 7. Four Leaderboards

The website must include four separate public leaderboards.

### 7.1 Leaderboard List

1. **Track 1: Text-Context-Aware Reasoning TTS / Unrestricted**
2. **Track 1: Text-Context-Aware Reasoning TTS / Small Model `<1B`**
3. **Track 2: Audio-Context-Aware Reasoning TTS / Unrestricted**
4. **Track 2: Audio-Context-Aware Reasoning TTS / Small Model `<1B`**

### 7.2 Leaderboard Table Columns

Recommended columns:

- Rank.
- Team.
- Model name.
- Institution.
- Submission ID.
- Submission date.
- Final score.
- Objective score.
- LLM-based score.
- Human score.
- Naturalness.
- Speech quality.
- Intelligibility.
- Speaker similarity.
- Prosody/expression.
- Reasoning quality.
- Speech-reasoning consistency.
- RTF.
- Model size.
- External data.
- System description link.

### 7.3 Public vs Private Leaderboard

Recommended design:

- During development, show a **public leaderboard** based on objective evaluation or a limited validation subset.
- During final evaluation, compute a **private official leaderboard** using hidden test data, LLM-based evaluation, and human evaluation.
- After final ranking is confirmed, reveal official results.

This reduces leaderboard overfitting and aligns with common competition practice.

### 7.4 Leaderboard Filters

Filters:

- Language: Chinese / English / Overall.
- Score type: Final / Objective / LLM / Human.
- Model category: Unrestricted / Small Model.
- External data: Allowed / Not used.
- Submission period: Development / Final.

### 7.5 Leaderboard Detail View

Clicking a row should open a team result page:

- Team profile.
- Model description.
- Declared resources.
- Score breakdown.
- Evaluation logs visible to organizers.
- Optional demo audio examples if the team allows public display.
- Link to challenge paper after acceptance.

## 8. Evaluation Page

The evaluation page should explain scoring in a transparent way.

### 8.1 Final Score

```text
Final Score = 0.3 * Objective Score + 0.2 * LLM-Based Score + 0.5 * Human Score
```

### 8.2 Objective Metrics

Suggested metrics:

- Naturalness: UTMOS-style score.
- Speech quality and clarity: DNSMOS-style score.
- Intelligibility: CER/WER from ASR.
- Speaker similarity: speaker-embedding cosine similarity.
- Prosody and expression: F0 correlation, duration error, emotion expressiveness.
- Efficiency: real-time factor.

### 8.3 LLM-Based Evaluation

Assesses:

- Whether the reasoning understands the dialogue context.
- Whether the reasoning is coherent and informative.
- Whether the generated speech follows the predicted speaking style.
- Whether reasoning and speech are mutually consistent.

### 8.4 Human Evaluation

Listeners rate:

- Context-speech coherence.
- Reasoning accuracy.
- Reasoning informativeness.
- Speech-reasoning consistency.
- Overall naturalness and expressiveness.

### 8.5 Validity Checks

Submissions may be rejected for:

- Missing outputs.
- Severe text-audio mismatch.
- Invalid audio files.
- Extremely low speech quality.
- Excessive inference time.
- Rule violations.
- Cascaded systems if prohibited by the official rules.

## 9. Rules Page

The rules page should be explicit because model competitions often fail when rules are ambiguous.

Recommended sections:

- Eligibility.
- Team formation.
- Track/category registration.
- Small-model definition.
- External data and pretrained model policy.
- Prohibited systems, including cascaded ASR-LLM-TTS pipelines if the challenge keeps this restriction.
- Submission package requirements.
- Reproducibility requirements.
- Data usage license.
- Copyright and non-commercial use.
- Privacy and responsible use.
- Paper submission requirements.
- Winner selection policy.
- Disqualification policy.

Important rule placeholders to finalize:

- Whether external TTS/speech/LLM datasets are allowed.
- Whether commercial APIs are allowed.
- Whether closed-source models are allowed.
- Whether teams may submit to multiple tracks.
- Whether one team can win multiple categories.
- Exact hardware limits for official inference.
- Exact maximum inference runtime and archive size.

## 10. Timeline Page

Use a visual timeline and a table.

Tentative schedule from the proposal:

| Milestone | Date |
| --- | --- |
| Challenge Proposal Acceptance | June 15, 2026 |
| Challenge Website Launch | June 15, 2026 |
| Dataset and Baseline Release | June 15, 2026 |
| Model Submission Deadline | August 3, 2026 |
| Objective Evaluation | August 4-10, 2026 |
| LLM-Based Evaluation | August 11-17, 2026 |
| Crowd-Sourced Human Evaluation | August 11-24, 2026 |
| Final Ranking and Winner Selection | August 25-30, 2026 |
| Paper Acceptance Notification | August 31, 2026 |
| Camera-Ready Deadline | September 21, 2026 |
| Challenge Session at ISCSLP 2026 | TBD |

The page should include timezone information, ideally **Anywhere on Earth (AoE)** or the official conference timezone.

## 11. Papers Page

This page supports the academic side of the challenge.

Recommended content:

- Challenge overview paper link.
- Baseline paper link.
- Accepted participant papers.
- Paper submission instructions.
- Required citation format.
- Camera-ready instructions.
- Session presentation schedule.

Participant paper metadata:

- Team name.
- Paper title.
- Authors.
- Institution.
- Track/category.
- Rank.
- PDF link.
- Code/model link if public.

## 12. FAQ Page

Suggested FAQ items:

- What is context-aware reasoning TTS?
- What is the difference between Track 1 and Track 2?
- Can we participate in both tracks?
- What counts as a small model?
- Can we use external datasets?
- Can we use pretrained speech or language models?
- Are cascaded ASR-LLM-TTS systems allowed?
- What audio format should outputs use?
- How many submissions are allowed?
- How is the final score computed?
- Will the hidden test set be released?
- Can teams publish generated audio examples?
- How do we report data or evaluation issues?

## 13. Contact and Announcements

### 13.1 Contact Page

Content:

- Organizer names and affiliations.
- Main contact email: `wbian@connect.ust.hk`
- Issue tracker link: `https://github.com/example/iscslp2026-cot-tts/issues`
- Mailing list or announcement channel.

### 13.2 Announcement System

Announcements should support:

- Pinned posts.
- Versioned updates.
- Email notifications.
- RSS or JSON feed.
- Markdown content.
- Attachments and links.

Suggested announcement categories:

- Data release.
- Baseline update.
- Rule clarification.
- Submission system maintenance.
- Evaluation update.
- Final results.

## 14. Participant Account and Team System

### 14.1 User Account

Required fields:

- Name.
- Email.
- Affiliation.
- Country/region.
- Role: student, researcher, engineer, organizer, reviewer.
- Agreement to data license and challenge rules.

### 14.2 Team Page

Team fields:

- Team name.
- Institution.
- Team members.
- Team leader.
- Contact email.
- Registered tracks.
- Public display name.
- Optional logo.

Team actions:

- Invite member.
- Remove member.
- Transfer leadership.
- Register for track/category.
- Accept data license.
- Select final submission.

## 15. Organizer Admin Dashboard

The admin dashboard should make the competition manageable without editing the database manually.

### 15.1 Overview

Admin summary cards:

- Registered users.
- Registered teams.
- Teams per track.
- Total submissions.
- Pending validations.
- Running evaluation jobs.
- Failed jobs.
- Leaderboard entries pending approval.

### 15.2 Submission Review

Admin controls:

- View submission package metadata.
- Download logs.
- Re-run validation.
- Approve or reject submission.
- Add internal notes.
- Mark suspected rule violation.
- Hide or reveal leaderboard entry.

### 15.3 Evaluation Job Manager

Controls:

- Queue evaluation.
- Cancel job.
- Retry failed job.
- Assign GPU/CPU resources.
- View logs.
- Store objective metrics.
- Attach LLM and human evaluation scores.

### 15.4 Leaderboard Manager

Controls:

- Publish/unpublish leaderboard.
- Freeze leaderboard.
- Reveal private leaderboard.
- Override invalid ranking entries.
- Export CSV.
- Add baseline rows.

### 15.5 Data and Resource Manager

Controls:

- Upload resource links.
- Version dataset releases.
- Update baseline links.
- Show checksum values.
- Deprecate old files.

## 16. Recommended Backend Data Model

Suggested entities:

- `User`
- `Team`
- `TeamMember`
- `Track`
- `Category`
- `Submission`
- `SubmissionFile`
- `ValidationJob`
- `EvaluationJob`
- `MetricResult`
- `LeaderboardEntry`
- `Announcement`
- `Resource`
- `Paper`
- `AuditLog`

Minimal `Submission` fields:

```json
{
  "id": "sub_000001",
  "team_id": "team_001",
  "track": "track1_text_context",
  "category": "small_model",
  "model_name": "Example-COT-TTS-0.6B",
  "parameter_count": 600000000,
  "status": "Completed",
  "created_at": "2026-07-01T12:00:00Z",
  "is_public": true,
  "is_final": false,
  "scores": {
    "final": 0.812,
    "objective": 0.786,
    "llm": 0.801,
    "human": 0.831
  }
}
```

## 17. Recommended Technical Architecture

### 17.1 Frontend

Recommended options:

- Next.js or React for a custom challenge website.
- Static homepage plus separate submission backend if development time is limited.
- Responsive layout for desktop and mobile.
- Markdown-based content management for rules, FAQ, and announcements.

### 17.2 Backend

Recommended components:

- REST or GraphQL API.
- PostgreSQL database.
- Object storage for submission archives and generated outputs.
- Worker queue for validation and evaluation jobs.
- Docker-based sandboxed evaluation.
- GPU job scheduler if official evaluation runs on dedicated servers.

### 17.3 Security

Important requirements:

- Authentication and role-based authorization.
- Signed URLs for private downloads.
- Virus/malware scan for uploaded archives.
- Sandboxed execution for submitted code.
- Strict resource limits for CPU, GPU, memory, disk, and time.
- Audit logs for admin actions.
- Never expose hidden test data to participant containers except during controlled evaluation.

## 18. Visual Design Direction

The site should feel like a modern speech and AI benchmark rather than a generic conference page.

Suggested visual style:

- Clean academic layout with strong information hierarchy.
- Audio-waveform and dialogue-context visual motifs.
- Four leaderboard cards using distinct but harmonious colors.
- Timeline displayed as a horizontal or vertical progression.
- Submission flow shown as a stepper.
- Dataset/model resources shown as downloadable cards.
- Use clear badges for `Track 1`, `Track 2`, `Unrestricted`, and `<1B`.

Suggested homepage sections:

1. Hero banner.
2. Challenge quick facts.
3. Task diagram.
4. Tracks and leaderboards.
5. Dataset and baseline resources.
6. Submission workflow.
7. Timeline.
8. Organizers and contact.

## 19. Minimum Viable Version

If time is limited, build the website in two stages.

### Stage 1: Public Information Site

Must include:

- Overview.
- Tasks.
- Data/model placeholder links.
- Submission instructions.
- Four static leaderboard placeholders.
- Rules.
- Timeline.
- FAQ.
- Contact.

### Stage 2: Functional Competition Platform

Add:

- Login/team registration.
- Data license acceptance.
- Model upload.
- Submission validation.
- Evaluation job queue.
- Dynamic leaderboards.
- Admin dashboard.
- Announcement system.

## 20. Final Checklist

Before launch, verify:

- All dates are correct.
- Data/model links are valid.
- Rules clearly define allowed and prohibited resources.
- Submission package template works.
- Local validation script matches official validation.
- Four leaderboard pages exist.
- Baseline appears on each relevant leaderboard.
- Contact email works.
- Hidden test data cannot be downloaded.
- Admin can freeze and reveal final results.
- The website explains both the research motivation and practical submission workflow.
