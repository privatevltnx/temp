# WebCreator Project Phases

## Phase 1: Project Kickoff
- **pending** - Order received and pending review
- **submitted** - Application submitted successfully  
- **in_review** - Application under review by our team
- **approved** - Project approved and kickoff meeting scheduled

## Phase 2: Design Phase
- **design** - Design phase in progress - creating wireframes and mockups
- **design_review** - Design review with client in progress
- **design_approved** - Design approved, moving to development

## Phase 3: Development Phase
- **development** - Development phase started - building your website
- **dev_review** - Development review and testing in progress
- **dev_complete** - Development completed, moving to QA

## Phase 4: Testing & QA
- **testing** - Quality assurance and testing in progress
- **qa_complete** - QA completed, preparing for launch

## Phase 5: Launch & Delivery
- **launch** - Website launch in progress
- **completed** - Project completed and delivered successfully

## Status Flow
```
pending → submitted → in_review → approved → design → design_review → design_approved → development → dev_review → dev_complete → testing → qa_complete → launch → completed
```

## Usage in Database
Update the `status` column in your `applications` table with any of these values:

```sql
-- Example updates
UPDATE applications SET status = 'design' WHERE order_id = 'WC-20241215-001';
UPDATE applications SET status = 'development' WHERE order_id = 'WC-20241215-002';
UPDATE applications SET status = 'completed' WHERE order_id = 'WC-20241215-003';
```

## Progress Mapping
Each status has an associated progress percentage:
- **pending**: 10%
- **submitted**: 30%
- **in_review**: 60%
- **approved**: 100% (Phase 1 complete)
- **design**: 50%
- **design_review**: 80%
- **design_approved**: 100% (Phase 2 complete)
- **development**: 40%
- **dev_review**: 70%
- **dev_complete**: 100% (Phase 3 complete)
- **testing**: 50%
- **qa_complete**: 100% (Phase 4 complete)
- **launch**: 50%
- **completed**: 100% (Project complete)